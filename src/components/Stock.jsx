import React from 'react'
import { useState, useEffect } from "react";

const Stock = () => {
  const [data, setData] = useState([]);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/myback/test`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        // console.log(result);
        setData(result);
        // console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <>
  <table className="table-auto w-full text-left border-collapse ">
            <thead>
              <tr className="bg-color2 border-black">
                <th className="px-4 py-2">產品編號</th>
                <th className="px-4 py-2">產品顏色</th> 
                <th className="px-4 py-2">目前庫存</th> 
                <th className="px-4 py-2">低於庫存數量</th> 
                <th className="px-4 py-2">供應商</th> 
                <th className="px-4 py-2">供應商電話</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">101</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">布萊德大公司</td>
                <td className="border px-4 py-2">123-4567</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">101</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">布萊德大公司</td>
                <td className="border px-4 py-2">123-4567</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">101</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">10</td>
                <td className="border px-4 py-2">布萊德大公司</td>
                <td className="border px-4 py-2">123-4567</td>
              </tr>
            </tbody>
          </table>
        

    </>
  )
}

export default Stock

