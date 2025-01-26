import React from 'react'
import { useState, useEffect } from "react";

const Stock = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/myback/getstock`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
     
      const cleanedData = result.map(item => ({
        productid: item.productid,
        colorsid: item.colorsid,
        stock:item.stock,
        minstock: item.minstock,
        name: item.name,
        phone: item.phone,
      }));

      setData(cleanedData);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <>
    //   <table className="table-auto w-full text-left border-collapse ">
    //     <thead>
    //       <tr className="bg-color2 border-black">
    //         <th className="px-4 py-2">產品編號</th>
    //         <th className="px-4 py-2">產品顏色</th>
    //         <th className="px-4 py-2">目前庫存</th>
    //         <th className="px-4 py-2">低於庫存數量</th>
    //         <th className="px-4 py-2">供應商</th>
    //         <th className="px-4 py-2">供應商電話</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {/* <tr>
    //             <td className="border px-4 py-2">101</td>
    //             <td className="border px-4 py-2">5</td>
    //             <td className="border px-4 py-2">5</td>
    //             <td className="border px-4 py-2">10</td>
    //             <td className="border px-4 py-2">布萊德大公司</td>
    //             <td className="border px-4 py-2">123-4567</td>
    //           </tr>
    //           <tr>
    //             <td className="border px-4 py-2">101</td>
    //             <td className="border px-4 py-2">5</td>
    //             <td className="border px-4 py-2">5</td>
    //             <td className="border px-4 py-2">10</td>
    //             <td className="border px-4 py-2">布萊德大公司</td>
    //             <td className="border px-4 py-2">123-4567</td>
    //           </tr> */}
          
    //         {data.map((item, index) => (
    //           <tr key={index} className="border-t">
    //             <td className="border px-4 py-2">{item.productid}</td>
    //             <td className="border px-4 py-2">{item.colorsid}</td>
    //             <td className="border px-4 py-2">{item.stock}</td>
    //             <td className="border px-4 py-2">{item.minstock}</td>
    //             <td className="border px-4 py-2">{item.name}</td>
    //             <td className="border px-4 py-2">{item.phone}</td>
    //           </tr>
    //         ))}
          
    //     </tbody>
    //   </table>


    // </>
    <div className="p-4 max-w-4xl mx-auto bg-color2 rounded-lg shadow-md">
      <div className="max-h-48 overflow-y-auto border rounded-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-color2 sticky top-0">
            <tr>
              <th className="px-4 py-2">產品編號</th>
              <th className="px-4 py-2">產品顏色</th>
              <th className="px-4 py-2">目前庫存</th>
              <th className="px-4 py-2">低於庫存數量</th>
              <th className="px-4 py-2">供應商</th>
              <th className="px-4 py-2">供應商電話</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="even:bg-color2">
                <td className="border px-4 py-2">{item.productid}</td>
                <td className="border px-4 py-2">{item.colorsid}</td>
                <td className="border px-4 py-2">{item.stock}</td>
                <td className="border px-4 py-2">{item.minstock}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Stock

