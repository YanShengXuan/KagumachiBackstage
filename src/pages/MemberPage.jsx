const MemberPage = () => {
    const inputstyle = "mt-10 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3 w-[20%] hover:border-2";
    const thstyle = "border border-[#161E24] text-sm text-left p-2";
    const buttonstyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[6%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
    return (
        <div className="w-full bg-[#A6A6A6] h-full pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[97%]">
                <div>
                    <div>
                        <div className="text-2xl">用戶列表</div>
                        <input placeholder="用Email搜尋"
                               className={inputstyle}/>
                        <input placeholder="用手機號碼搜尋"
                               className={inputstyle}/>
                        <button
                            className={buttonstyle}>搜尋
                        </button>
                    </div>

                </div>
                <table className="mt-10 w-[100%]">
                    <tr>
                        <th className={thstyle}>ID</th>
                        <th className={thstyle}>姓名</th>
                        <th className={thstyle}>Email</th>
                        <th className={thstyle}>電話</th>
                        <th className={thstyle}>郵遞區號</th>
                        <th className={thstyle}>地址</th>
                        <th className={thstyle}>創辦日期</th>
                        <th className={thstyle}>修改</th>
                        <th className={thstyle}>刪除</th>

                    </tr>
                </table>
            </div>
        </div>
    );
};

export default MemberPage;