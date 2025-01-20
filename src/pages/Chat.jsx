import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { Input } from "antd";
import ChatWindow from "../components/ChatWindow";

const managerMemberId = "0"; // 固定後台管理員ID為0

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState([]);
  const stompClientRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws", // 先用localhost，之後再改成部署的網址，測試時要換IP請自行更改。
      connectHeaders: {
        memberId: managerMemberId,
      },
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // 先用localhost，之後再改成部署的網址，測試時要換IP請自行更改。
      debug: (str) => {
        console.log("STOMP: " + str);
      },
      onConnect: (frame) => {
        console.log("WebSocket connected:", frame);
        stompClientRef.current = client;

        client.subscribe("/topic/users", (messageOutput) => {
          const usersList = JSON.parse(messageOutput.body);
          console.log("Received users from server:", usersList);
          setUsers(usersList.map((id) => ({ id, name: `user ${id}` })));
        });

        client.subscribe(
          "/topic/messages/" + managerMemberId,
          (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            console.log("Received message from server:", message);
            if (
              message.receiverid === managerMemberId ||
              message.senderid === managerMemberId
            ) {
              setMessages((prevMessages) => [...prevMessages, message]);
              if (
                !users.some((user) => user.id === message.senderid) &&
                message.senderid !== "0"
              ) {
                console.log("Adding user to list:", message.senderid);
                setUsers((prevUsers) => [
                  ...prevUsers,
                  { id: message.senderid, name: `User ${message.senderid}` },
                ]);
              }
              if (!message.isbackread) {
                setNewMessageUsers((prev) => [...new Set([...prev, message.senderid])]);
              }
            }
          }
        );

        client.subscribe("/topic/historyBack", (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          console.log("Received history from server:", historyMessages);
          setMessages(historyMessages);
        });

        client.subscribe("/topic/unreadBackMessages", (messageOutput) => {
          const unreadMessages = JSON.parse(messageOutput.body);
          console.log("Received unread back messages from server:", unreadMessages);
          const unreadUserIds = unreadMessages.map((message) => message.senderid.toString());
          setNewMessageUsers(unreadUserIds);
          console.log("Updated newMessageUsers:", unreadUserIds);
        });

        client.publish({
          destination: "/app/users",
        });

        client.publish({
          destination: "/app/unreadBackMessages",
          body: JSON.stringify(managerMemberId),
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket disconnected:", event);
      },
    });

    client.activate();

    return () => {
      console.log("Disconnecting WebSocket");
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollToBottom();
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") {
      // console.error("訊息不可為空");
      return;
    }
    if (stompClientRef.current && stompClientRef.current.connected) {
      const message = {
        senderid: managerMemberId,
        content: input,
        receiverid: selectedUser?.id || "",
      };
      console.log("Sending message:", message);
      stompClientRef.current.publish({
        destination: "/app/message",
        body: JSON.stringify(message),
      });
      setMessages((prevMessages) =>
        [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp)
      );
      setInput("");
    } else {
      console.error("The connection has not been established yet");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
    setNewMessageUsers((prev) => prev.filter((id) => id !== user.id));
    stompClientRef.current.publish({
      destination: "/app/historyBack",
      body: JSON.stringify({
        senderid: managerMemberId,
        receiverid: user.id.toString(),
      }),
    });
    stompClientRef.current.publish({
      destination: "/app/markAsReadBack",
      body: JSON.stringify(user.id),
    });
  };

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        <div className="p-8 flex">
          <div className="w-[15%] pr-2">
            <h2 className="text-lg font-bold mb-4 pl-7">會員訊息</h2>
            <ul className="pr-8">
              {users.map((user) => {
                console.log("Rendering user:", user);
                console.log("newMessageUsers:", newMessageUsers);
                return (
                  <li
                    key={user.id}
                    className={`p-3 mb-2 cursor-pointer text-[#000] ${
                      selectedUser && selectedUser.id === user.id
                        ? "bg-[#535759] rounded-xl text-[#FCF6F0]"
                        : "bg-[rgb(216,216,216)]"
                    } hover:bg-[#535759] hover:rounded-xl hover:text-[#fff] relative`}
                    onClick={() => handleUserClick(user)}
                  >
                    {user.name}
                    {newMessageUsers.includes(user.id) && (
                      <span className="absolute top-[0.5rem] right-[1rem] text-xl text-red-500 font-bold">!</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-[85%] flex flex-col">
            <ChatWindow
              ref={chatWindowRef}
              messages={messages}
              selectedUser={selectedUser}
              managerMemberId={managerMemberId}
            />
            <Input.TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="請輸入訊息"
              className="mb-2"
            />
            <div className="flex justify-center">
              <button
                className="px-20 py-3 border border-gray-300 rounded-md bg-[#5783db] text-gray-100 hover:bg-[#55c2da] hover:text-gray-100 hover:cursor-pointer"
                onClick={sendMessage}
              >
                確認送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
