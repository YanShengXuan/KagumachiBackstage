import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  meridiem: (hour) => {
    if (hour < 12) {
      return "上午";
    } else {
      return "下午";
    }
  },
});

const ChatWindow = forwardRef(({ messages, selectedUser, managerMemberId }, ref) => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const filterAndSortMessages = () => {
      const selectedUserId = parseInt(selectedUser?.id, 10);
      const managerId = parseInt(managerMemberId, 10);

      const newFilteredMessages = messages
        .filter((msg) => {
          const senderId = parseInt(msg.senderid, 10);
          const receiverId = parseInt(msg.receiverid, 10);

          const isSender = senderId === selectedUserId && receiverId === managerId;
          const isReceiver = senderId === managerId && receiverId === selectedUserId;

          return isSender || isReceiver;
        })
        .sort((a, b) => a.timestamp - b.timestamp);

      setFilteredMessages(newFilteredMessages);
    };

    filterAndSortMessages();
  }, [messages, selectedUser, managerMemberId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  }));

  const formatTime = (timestamp) => {
    return dayjs(timestamp).format("A hh:mm");
  };

  const formatDate = (timestamp) => {
    return dayjs(timestamp).format("YYYY-MM-DD");
  };

  const renderMessagesWithDate = () => {
    const renderedMessages = [];
    let lastDate = null;

    filteredMessages.forEach((msg, index) => {
      const currentDate = formatDate(msg.timestamp);
      if (currentDate !== lastDate) {
        renderedMessages.push(
          <div key={`date-${index}`} className="text-center text-gray-500 my-2">
            {currentDate}
          </div>
        );
        lastDate = currentDate;
      }

      const isManagerSender = parseInt(msg.senderid, 10) === parseInt(managerMemberId, 10);
      renderedMessages.push(
        <div
          key={uuidv4()}
          className={`mt-3 flex ${isManagerSender ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`text-lg text-[#202020] font-chat relative p-3 rounded break-words whitespace-pre-wrap max-w-[75%] ${isManagerSender ? "bg-[#E0F2FC]" : "bg-[#FBDCEA]"} text-left rounded-lg`}
          >
            {msg.content}
            <div
              className={`absolute text-xs font-chat text-gray-500 bottom-[0.2rem] ${isManagerSender ? "left-[-4.5rem]" : "right-[-4.5rem]"}`}
            >
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      );
    });

    return renderedMessages;
  };

  return (
    <div
      ref={chatContainerRef}
      className="w-full mb-5 h-[28rem] overflow-y-auto border border-gray-300 rounded-lg p-3 bg-[#FCF6F0]"
    >
      {selectedUser ? (
        renderMessagesWithDate()
      ) : (
        <div className="text-center text-gray-500 text-2xl  my-[13rem] ml-[2rem]">
          請先選擇會員再回覆訊息。
        </div>
      )}
    </div>
  );
});

export default ChatWindow;