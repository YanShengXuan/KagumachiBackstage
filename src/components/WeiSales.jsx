import React from 'react'
import { useState, useEffect } from "react";

const WeiSales = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/myback/getsales');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            setData(result);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            {data.map((item, index) => (
                <li key={index}>
                    {item.categoryname} 目前有 {item.salesdesc}
                </li>
            ))}
        </>
    )
}

export default WeiSales