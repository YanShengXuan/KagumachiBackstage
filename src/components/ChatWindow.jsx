import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const ChatWindow = ({ messages, selectedUser, managerMemberId }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);

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

  return (
    <div className="w-full mb-5 h-96 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-[#FCF6F0]">
      {filteredMessages.map((msg) => (
        <div
          key={uuidv4()} // 使用 uuid 生成唯一的 key
          className={`mb-2 p-3 rounded break-words whitespace-pre-wrap flex ${parseInt(msg.senderid, 10) === parseInt(managerMemberId, 10) ? "justify-end" : "justify-start"}`}
        >
          <div className={`${parseInt(msg.senderid, 10) === parseInt(managerMemberId, 10) ? "bg-[#E0F2FC] text-right" : "bg-[#FBDCEA] text-left"} p-3 rounded-lg`}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;