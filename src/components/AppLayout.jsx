import React from 'react'
import Navbar from './NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className='flex h-screen'>
            <div className='w-[20%] h-[100%] fixed'>
                <Navbar />
            </div>
            <div className='ml-[20%] w-[80%]' >
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout