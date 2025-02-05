import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const MemberPage = () => {
    const [member, setMember] = useState([]);
    const [latestOrders, setLatestOrders] = useState({});
    const [editMember, setEditMember] = useState(null);
    const [formData, setFormData] = useState({});
    const [searchMember, setSearchMember] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/member/showAllMember")
            .then((response) => response.json())
            .then((data) => setMember(data))
            .catch((error) => console.error("Error fetching main categories:", error));
    }, []);

    const fetchLatestOrder = async (memberid) => {
        try {
            const response = await fetch(`http://localhost:8080/member/latest/${memberid}`);
            if (!response.ok) throw new Error("No Order Found");

            const orderData = await response.json();
            setLatestOrders((prev) => ({
                ...prev,
                [memberid]:{ orderid: orderData.orderid, orderserial: orderData.orderserial },
            }));
        } catch (error) {
            console.error(`Error fetching order for member ${memberid}:`, error);
        }
    };
    useEffect(() => {
        if (member.length > 0) {
            member.forEach((m) => fetchLatestOrder(m.memberid));
        }
    }, [member]);

    //更新會員編輯
    const handleEditClick = (member) => {
        setEditMember(member.memberid);
        setFormData({...member});
    }

    //更新會員輸入框
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    //更新會員儲存
    const handleSave = () => {
        fetch(`http://localhost:8080/member/updateMember/${editMember}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setMember((prev) =>
                    prev.map((m) => (m.memberid === editMember ? data : m))
                );
                setEditMember(null);//關閉編輯

            })
            .catch((error) => console.error("Error updating member", error));
    }
    //Enter鍵保存會員資料
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        }
    }
    //刪除會員
    const handleDelete = (memberid) => {
        fetch(`http://localhost:8080/member/deleteMember/${memberid}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                setMember(prev => prev.filter(m => m.memberid !== memberid));
            })
            .catch((error) => console.error("Error deleting member:", error));
    }

    //搜尋會員
    const fetchMembers = (query = "") => {
        const url = query
            ? `http://localhost:8080/member/searchMember?query=${encodeURIComponent(query)}`
            : "http://localhost:8080/member/showAllMember";
        fetch(url)
            .then((response) => response.json())
            .then((data) => setMember(data))
            .catch((error) => console.error("Error fetching members:", error));
    };

    //初始加載所有用戶
    useEffect(() => {
        fetchMembers();
    }, []);

    //處理搜尋input
    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchMember(value);

        //動態查詢
        if (value.trim() === "") {
            fetchMembers();
        } else {
            fetchMembers(value);
        }
    };

    //搜尋功能
    const handleSearch = (e) => {
        e.preventDefault();
        fetchMembers(searchMember);
    }


    const inputstyle = "mt-10 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3 w-[20%] hover:border-2";
    const editInputStyle = "border border-[#161E24] focus:outline-none p-2 rounded-xl w-[99%] hover:border-2";
    const thstyle = "border border-[#161E24] text-sm text-left p-2 ";
    const editButtonStyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[80%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
    return (
        <div className="w-full bg-[#A6A6A6] pt-10 h-full min-h-screen">
            <div className="w-[98%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl">
                <div>
                    <div>
                        <div className="text-2xl">用戶列表</div>
                        <form onSubmit={handleSearch}>
                            <input placeholder="Email 電話 搜尋"
                                   className={inputstyle}
                                   value={searchMember}
                                   onChange={handleSearchInputChange}
                            />

                        </form>
                    </div>

                </div>

                <div className="mt-10 w-full max-h-[75vh] min-h-[75vh] overflow-auto border border-gray-300">
                    <table className="w-full bg-white">
                        <thead>
                        <tr>
                            <th className={`${thstyle} w-[2%]`}>ID</th>
                            <th className={`${thstyle} w-[10%]`}>姓名</th>
                            <th className={`${thstyle} w-[15%]`}>Email</th>
                            <th className={`${thstyle} w-[10%]`}>電話</th>
                            <th className={`${thstyle} w-[5%]`}>郵遞區號</th>
                            <th className={`${thstyle} w-[5%]`}>縣市</th>
                            <th className={`${thstyle} w-[20%]`}>地址</th>
                            <th className={`${thstyle} w-[10%]`}>訂單編號</th>
                            <th className={`${thstyle} w-[10%]`}>創辦日期</th>
                            <th className={`${thstyle} w-[5%]`}>修改</th>
                            <th className={`${thstyle} w-[5%]`}>刪除</th>
                        </tr>
                        </thead>
                        <tbody>
                        {member.map((m) => (
                            <tr key={m.memberid}>
                                <td className={thstyle}>{m.memberid}</td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <input
                                            className={editInputStyle}
                                            name="realname"
                                            value={formData.realname || ""}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    ) : (
                                        m.realname
                                    )}
                                </td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <input
                                            className={editInputStyle}
                                            name="email"
                                            value={formData.email || ""}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    ) : (
                                        m.email
                                    )}
                                </td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <input
                                            className={editInputStyle}
                                            name="phone"
                                            value={formData.phone || ""}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    ) : (
                                        m.phone
                                    )}
                                </td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <input
                                            className={editInputStyle}
                                            name="postalcode"
                                            value={formData.postalcode || ""}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    ) : (
                                        m.postalcode
                                    )}
                                </td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <input
                                            className={editInputStyle}
                                            name="city"
                                            value={formData.city || ""}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    ) : (
                                        m.city
                                    )}
                                </td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <input
                                            className={editInputStyle}
                                            name="address"
                                            value={formData.address || ""}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    ) : (
                                        m.address
                                    )}
                                </td>
                                <td className={thstyle}>
                                    {latestOrders[m.memberid] ? (
                                        <Link
                                            to={{
                                                pathname: "/orderManagement",
                                            }}
                                            state={{ orderId: latestOrders[m.memberid].orderid }}
                                            className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                                        >
                                            {latestOrders[m.memberid].orderserial}
                                        </Link>
                                    ) : (
                                        "無訂單"
                                    )}
                                </td>
                                <td className={thstyle}>{m.registrationdate}</td>
                                <td className={thstyle}>
                                    {editMember === m.memberid ? (
                                        <>
                                            <button
                                                className={editButtonStyle}
                                                onClick={handleSave}
                                            >
                                                保存
                                            </button>

                                        </>
                                    ) : (
                                        <button
                                            className={editButtonStyle}
                                            onClick={() => handleEditClick(m)}
                                        >
                                            修改
                                        </button>
                                    )}
                                </td>
                                <td className={thstyle}>
                                    <button
                                        className={editButtonStyle}
                                        onClick={() => handleDelete(m.memberid)}
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            </div>
            );
            };

            export default MemberPage;