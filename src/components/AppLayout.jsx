import React from 'react'
import Navbar from './NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className='flex'>
            < Navbar />
            
            <Outlet />
        </div>
    )
}

export default AppLayout