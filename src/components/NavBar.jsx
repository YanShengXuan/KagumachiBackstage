import React from "react";
import { Link, useMatch } from "react-router-dom";

const Navbar = () => {
  const isMemberPage = useMatch("/memberpage");
  const isProductPage = useMatch("/productpage");
  const isCategories = useMatch("/categories");
  const isOrderManagement = useMatch("/orderManagement/*");
  const isFinancialManagement = useMatch("/financialManagement");
  const isSupplierManagement = useMatch("/suppliermanagement");
  const isSales = useMatch("/sales");
  const isSalesForClasses = useMatch("/salesforclasses");
  const isIncomeStatement = useMatch("/incomeStatement");
  const isShipRateTable = useMatch("/ship/shipratetable");
  const isShipOrderTable = useMatch("/ship/shipordertable");
  const isChat = useMatch("/chat/messages");
  const isSetting = useMatch("/setting");
  
  const link =
    "rounded-3xl w-full block text-black py-4 px-3 hover:text-white hover:bg-color1 text-2xl";

  return (
    <>
      <div className="bg-color3 h-screen">
        <div className="flex px-5 py-10  rounded-xl h-full ">
          <div className="bg-color2 p-4 rounded-xl w-[20vw] h-[100%] ">
            <div className=" bg-color2 p-2 flex-col flex-wrap text-center">
              <Link to="testone">
                <h1 className="rounded-3xl py-1 px-4 bg-color2 text-4xl font-bold text-gray-800 italic text-center font-poppins">
                  Kagu machi
                </h1>
              </Link>
              <Link to="memberpage">
                <div
                  className={`${link} ${
                    isMemberPage ? "bg-color1" : "bg-color2"
                  }`}
                >
                  會員管理
                </div>
              </Link>
              <Link to="productpage">
                <div
                  className={`${link} ${
                    isProductPage || isCategories ? "bg-color1" : "bg-color2"
                  }`}
                >
                  商品管理
                </div>
              </Link>
              <Link to="orderManagement">
                <div
                  className={`${link} ${
                    isOrderManagement ? "bg-color1" : "bg-color2"
                  }`}
                >
                  訂單查詢
                </div>
              </Link>
              <Link to="financialManagement">
                <div
                  className={`${link} ${
                    isFinancialManagement ? "bg-color1" : "bg-color2"
                  }`}
                >
                  財務查詢
                </div>
              </Link>
              <Link to="suppliermanagement">
                <div
                  className={`${link} ${
                    isSupplierManagement ? "bg-color1" : "bg-color2"
                  }`}
                >
                  廠商管理
                </div>
              </Link>
              <Link to="sales">
                <div
                  className={`${link} ${isSales || isSalesForClasses ? "bg-color1" : "bg-color2"}`}
                >
                  行銷/促銷
                </div>
              </Link>
              <Link to="incomeStatement">
                <div
                  className={`${link} ${
                    isIncomeStatement ? "bg-color1" : "bg-color2"
                  }`}
                >
                  數據/報表
                </div>
              </Link>
              <Link to="ship/shipratetable">
                <div
                  className={`${link} ${
                    isShipRateTable || isShipOrderTable ? "bg-color1" : "bg-color2"
                  }`}
                >
                  配送/物流
                </div>
              </Link>
              <Link to="chat/messages">
                <div
                  className={`${link} ${isChat ? "bg-color1" : "bg-color2"}`}
                >
                  客服系統
                </div>
              </Link>
              <Link to="setting">
                <div
                  className={`${link} ${isSetting ? "bg-color1" : "bg-color2"}`}
                >
                  設定
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
