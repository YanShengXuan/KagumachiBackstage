import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './components/AppLayout';
import HomePage from "./pages/HomePage";
import "./App.css";
import Navbar from "./components/NavBar";

function App() {

  return (
      <BrowserRouter basename="/KagumachiBackstage">
        <Routes>
          <Route path="/" element={<AppLayout />}>
             <Route index element={<HomePage />} />
               <Route path="homepage" element={<HomePage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
