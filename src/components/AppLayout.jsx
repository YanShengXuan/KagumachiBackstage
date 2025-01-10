import React from 'react'
import Navbar from './NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className='flex h-screen'>
            <div className='w-[15%] fixed'>
                <Navbar />
            </div>
            <div className='ml-[15%] w-[85%]' >
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout