import React, { useState, useEffect } from "react";

const WeiMessage = () => {
  const [hasUnread, setHasUnread] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/myback/getmessage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      const hasUnreadMessage = result.some((item) => item.isbackread === true);
      setHasUnread(hasUnreadMessage);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {hasUnread ? (
        <li>1.有未讀訊息</li> 
      ) : (
        <li>1.目前無未讀訊息</li> 
      )}
    </>
  );
};

export default WeiMessage;
