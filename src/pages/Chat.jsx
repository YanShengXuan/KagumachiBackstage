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
  const stompClientRef = useRef(null);

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
          setUsers(usersList.map((id) => ({ id, name: `User ${id}` })));
        });

        client.subscribe("/topic/messages/" + managerMemberId, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          console.log("Received message from server:", message);
          if (message.receiverid === managerMemberId || message.senderid === managerMemberId) {
            setMessages((prevMessages) => [...prevMessages, message]);
            if (!users.some((user) => user.id === message.senderid) && message.senderid !== "0") {
              console.log("Adding user to list:", message.senderid);
              setUsers((prevUsers) => [...prevUsers, { id: message.senderid, name: `User ${message.senderid}` }]);
            }
          }
        });

        client.subscribe("/topic/historyBack", (messageOutput) => {
          const historyMessages = JSON.parse(messageOutput.body);
          console.log("Received history from server:", historyMessages);
          setMessages(historyMessages);
        });

        // 請求用戶列表
        client.publish({
          destination: "/app/users",
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

  const sendMessage = () => {
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
      setMessages((prevMessages) => [...prevMessages, message].sort((a, b) => a.timestamp - b.timestamp));
      setInput("");
    } else {
      console.error("The connection has not been established yet");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
    stompClientRef.current.publish({
      destination: "/app/historyBack",
      body: JSON.stringify({ senderid: managerMemberId, receiverid: user.id.toString() }),
    });
  };

  return (
    <div className="p-5 flex">
      <div className="w-[20%] border-r border-gray-300">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 cursor-pointer ${selectedUser && selectedUser.id === user.id ? "bg-gray-300" : ""}`}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[80%] flex flex-col justify-center">
        <ChatWindow messages={messages} selectedUser={selectedUser} managerMemberId={managerMemberId} />
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
  );
};

export default Chat;