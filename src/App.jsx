import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import Ship from "./pages/Ship";
import ShipRateTable from "./components/ShipRateTable";
import ShipOrderTable from "./components/ShipOrderTable";
import Setting from "./pages/Setting";
import TestOne from "./pages/TestOne.jsx";
import FinancialManagement from "./pages/FinancialManagement.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";
import IncomeStatement from "./pages/IncomeStatement";
import MemberPage from "./pages/MemberPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Categories from "./pages/Categories.jsx";
import Chat from "./pages/Chat";
import Messages from "./components/Messages.jsx";
import AutoChatSetting from "./components/AutoChatSetting.jsx";
import "./App.css";
import SupplierManagement from "./pages/SupplierManagement.jsx";
import Sales from "./pages/Sales.jsx";
import SalesforClasses from "./pages/SalesforClasses.jsx";

function App() {
  return (
    <BrowserRouter basename="/KagumachiBackstage">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<TestOne />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="orderManagement" element={<OrderManagement />} />
          <Route path="financialManagement" element={<FinancialManagement />} />
          <Route path="ship" element={<Ship />} >
            <Route path="shipratetable" element={<ShipRateTable />} />
            <Route path="shipordertable" element={<ShipOrderTable />} />
          </Route>
          <Route path="setting" element={<Setting />} />
          <Route path="incomeStatement" element={<IncomeStatement />} />
          <Route path="testone" element={<TestOne />} />
          <Route path="memberpage" element={<MemberPage />} />
          <Route path="productpage" element={<ProductPage />} />
          <Route path="categories" element={<Categories />} />
          <Route path="chat" element={<Chat />} >
            <Route path="messages" element={<Messages />} />
            <Route path="autochatsetting" element={<AutoChatSetting />} />
          </Route>
          <Route path="suppliermanagement" element={<SupplierManagement />} />
          <Route path="sales" element={<Sales />} />
          <Route path="salesforclasses" element={<SalesforClasses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
