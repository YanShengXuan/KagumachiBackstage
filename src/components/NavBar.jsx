import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("主頁");

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };
  return (
    <>
      <div className="bg-color3 h-screen">
        <div className="flex p-10 rounded-xl ">
          <div className="bg-color2 p-4 rounded-xl w-[20vw] h-[100%] ">
            <div className=" bg-color2 p-2 flex-col flex-wrap text-center">
              <button
                className={`rounded-3xl  text-black py-5 px-4 bg-color2 text-3xl ${
                  activeTab === "主頁" ? "bg-color2" : "bg-color2"
                }`}
                onClick={() => openPage("主頁")}
              >
                <h1 className="text-4xl  font-bold text-gray-800 italic text-center font-poppins">
                  <Link to="testone">Kagu machi</Link>
                </h1>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1   text-2xl ${
                  activeTab === "會員管理" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("會員管理")}
              >
                會員管理
                <Link></Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "商品管理" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("商品管理")}
              >
                商品管理
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "訂單管理" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("訂單管理")}
              >
                <Link to="orderManagement">訂單管理</Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "財務管理" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("財務管理")}
              >
                <Link to="financialManagement">財務管理</Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "庫存/倉儲" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("庫存/倉儲")}
              >
                庫存/倉儲
                <Link></Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "行銷/促銷" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("行銷/促銷")}
              >
                行銷/促銷
                <Link></Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "數據/報表" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("數據/報表")}
              >
                數據/報表
                <Link></Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "配送/物流" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("配送/物流")}
              >
                <Link to="ship">配送/物流</Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1  text-2xl ${
                  activeTab === "客服系統" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("客服系統")}
              >
                <Link>客服系統</Link>
              </button>
              <button
                className={`rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1 text-2xl ${
                  activeTab === "設定" ? "bg-color1" : "bg-color2"
                }`}
                onClick={() => openPage("設定")}
              >
                <Link to="setting">設定</Link>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="w-[80vw] flex  p-10 rounded-xl ">
                    <div className="bg-gray-300 p-4 rounded-xl h-[95vh] w-[100vw]" >                       
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default Navbar;
