import React from "react";
import { useState } from 'react'
import HomePage from "../pages/HomePage";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('主頁');

    const openPage = (pageName) => {
        setActiveTab(pageName);
    };
    return (
        <>
            <div className="m-0 p-0  flex bg-color3">
                <div className=" flex  p-10 rounded-xl ">
                    <div className="bg-color2 p-4 rounded-xl w-[20vw] h-[95vh] " >
                        <div className=" bg-color2 p-2  flex-col flex-wrap text-center ">
                            <button
                                className={`rounded-3xl  text-black py-5 px-4 bg-color2 text-3xl ${activeTab === '主頁' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('主頁')}>
                                <h1 className="text-4xl  font-bold text-gray-800 italic text-center font-poppins">Kagu machi</h1>
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1   text-3xl ${activeTab === '會員管理' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('會員管理')}>
                                會員管理
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === '商品管理' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('商品管理')}>
                                商品管理
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === '訂單管理' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('訂單管理')}>
                                訂單管理
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === '財務管理' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('財務管理')}>
                                財務管理
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === '庫存/倉儲' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('庫存/倉儲')}>
                                庫存/倉儲
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === '行銷/促銷' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('行銷/促銷')}>
                                行銷/促銷
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === '數據/報表' ?'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('數據/報表')}>
                                數據/報表
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1  text-3xl ${activeTab === ' 客服系統' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('客服系統')}>
                                客服系統
                            </button>
                            <button
                                className={`rounded-3xl w-full block text-black py-5 px-4 hover:text-white hover:bg-color1 text-3xl ${activeTab === '設定' ? 'bg-color2' : 'bg-color2'
                                    }`}
                                onClick={() => openPage('設定')}>
                                設定
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
