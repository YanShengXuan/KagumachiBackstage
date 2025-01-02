import React from 'react'
import A from "../img/homepic.png";

const HomePage = () => {

  return (
    <>
      <div className="w-full flex p-10 bg-color3">
        <div className="p-4 rounded-xl h-[95vh]" >
          <img src={A} />
        </div>
      </div>
    </>
  )
}

export default HomePage