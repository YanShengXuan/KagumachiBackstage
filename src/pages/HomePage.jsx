import React from 'react'
import A from "../img/homepic.png";
import { useState } from 'react'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('主頁');

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };
  return (
    <>
      <div className="w-full flex  p-10  bg-gray-400">
        <div className=" p-4 rounded-xl h-[95vh] " >
          <img src={A} />
        </div>
      </div>
    </>
  )
}

export default HomePage