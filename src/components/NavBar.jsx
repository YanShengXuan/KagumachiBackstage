import React from "react";
import { useState } from 'react'
import HomePage from "../pages/HomePage";


const Navbar = () => {
    const [activeTab, setActiveTab] = useState('主頁');

    const openCity = (cityName) => {
        setActiveTab(cityName);
    };
    return (
        <>
            <div className="m-0 p-0 flex bg-gray-400 ">
                <div className="w-[20vw] flex  p-10 rounded-xl ">
                    <div className="bg-gray-300 p-4 rounded-xl h-[95vh] " >
                        <nav className="flex-1 bg-gray-300 p-4 space-y-2 text-center">
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-300 text-3xl ${activeTab === '會員管理' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('主頁')}>
                                <h1 className="text-5xl font-bold text-gray-800 italic text-center font-poppins">Kagu machi</h1>
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '會員管理' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('會員管理')}>
                                會員管理
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '商品管理' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('商品管理')}>
                                商品管理
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '訂單管理' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('訂單管理')}>
                                訂單管理
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '財務管理' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('財務管理')}>
                                財務管理
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '庫存/倉儲' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('庫存/倉儲')}>
                                庫存/倉儲
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '行銷/促銷' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('行銷/促銷')}>
                                行銷/促銷
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '數據/報表' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('數據/報表')}>
                                數據/報表
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === ' 客服系統' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('客服系統')}>
                                客服系統
                            </button>
                            <button
                                className={`rounded-3xl w-full text-white py-5 px-4 hover:bg-gray-500 text-3xl ${activeTab === '設定' ? 'bg-gray-300' : 'bg-gray-300'
                                    }`}
                                onClick={() => openCity('設定')}>
                                設定
                            </button>
                        </nav>
                    </div>
                </div>
                <div className="w-[80vw] flex  p-10 rounded-xl ">
                    <div className="bg-gray-300 p-4 rounded-xl h-[95vh] w-[100vw]" >
                        {activeTab === '主頁' && (
                            <div className="">
                                <HomePage />
                            </div>
                        )}
                        {activeTab === '會員管理' && (
                            <div>
                                <h3 className="text-xl font-bold">會員管理</h3>
                                <p>會員管理的頁面</p>
                            </div>
                        )}
                        {activeTab === '商品管理' && (
                            <div>
                                <h3 className="text-xl font-bold">商品管理</h3>
                                <p>商品管理的頁面</p>
                            </div>
                        )}
                        {activeTab === '訂單管理' && (
                            <div>
                                <h3 className="text-xl font-bold">訂單管理</h3>
                                <p>訂單管理的頁面</p>
                            </div>
                        )}
                        {activeTab === '財務管理' && (
                            <div>
                                <h3 className="text-xl font-bold">財務管理</h3>
                                <p>財務管理的頁面</p>
                            </div>
                        )}
                        {activeTab === '庫存/倉儲' && (
                            <div>
                                <h3 className="text-xl font-bold">庫存/倉儲</h3>
                                <p>庫存/倉儲的頁面</p>
                            </div>
                        )}
                        {activeTab === '行銷/促銷' && (
                            <div>
                                <h3 className="text-xl font-bold">行銷/促銷</h3>
                                <p>行銷/促銷</p>
                            </div>
                        )}
                        {activeTab === '數據/報表' && (
                            <div>
                                <h3 className="text-xl font-bold">數據/報表</h3>
                                <p>數據/報表的頁面</p>
                            </div>
                        )}
                        {activeTab === '客服系統' && (
                            <div>
                                <h3 className="text-xl font-bold">客服系統</h3>
                                <p>客服系統的頁面</p>
                            </div>
                        )}
                        {activeTab === '設定' && (
                            <div>
                                <h3 className="text-xl font-bold">設定</h3>
                                <p>設定的頁面</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
