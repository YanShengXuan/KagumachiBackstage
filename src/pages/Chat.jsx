import React from "react";
import { Link, useMatch, Outlet } from "react-router-dom";

const Chat = () => {
  const isMessages = useMatch("/chat/messages");
  const isAutoChatSetting = useMatch("/chat/autochatsetting");

  return (
    <div className="w-full bg-[#A6A6A6] h-full pt-10">
      <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
        <div className="text-2xl my-2">
          <Link to="/chat/messages" className="hover:font-bold">
            <span
              className={`${
                isMessages ? "bg-[#27333f] p-2 text-white rounded-xl" : ""
              }`}
            >
              會員訊息
            </span>
          </Link>
          <span className="m-2">/</span>
          <Link to="/chat/autochatsetting" className="hover:font-bold">
            <span
              className={`${
                isAutoChatSetting
                  ? "bg-[#27333f] p-2 text-white rounded-xl"
                  : ""
              }`}
            >
              設定自動回覆
            </span>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
