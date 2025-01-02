import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import Ship from "./pages/Ship";
import Setting from "./pages/Setting";
import TestOne from "./pages/TestOne.jsx";
import "./App.css";

import FinancialManagement from "./pages/FinancialManagement.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";

import IncomeStatement from "./pages/IncomeStatement";

function App() {
  return (
    <BrowserRouter basename="/KagumachiBackstage">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="orderManagement" element={<OrderManagement />} />
          <Route path="financialManagement" element={<FinancialManagement />} />
          <Route path="ship" element={<Ship />} />
          <Route path="setting" element={<Setting />} />
          <Route path="incomeStatement" element={<IncomeStatement />} />
          <Route path="testone" element={<TestOne />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
