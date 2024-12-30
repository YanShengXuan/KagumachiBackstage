import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './components/AppLayout';
import HomePage from "./pages/HomePage";
import "./App.css";

import FinancialManagement from './pages/FinancialManagement.jsx'
import OrderManagement from './pages/OrderManagement.jsx'


function App() {

  return (
      <BrowserRouter basename="/KagumachiBackstage">
        <Routes>
          <Route path="/" element={<AppLayout />}>
             <Route index element={<HomePage />} />
               <Route path="homepage" element={<HomePage />} /> 
               <Route path="ordermanagement" element={<OrderManagement />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
