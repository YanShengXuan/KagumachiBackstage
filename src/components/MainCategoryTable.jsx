const MainCategoryTable = ({
                               maincategories,
                               editMainCategory,
                               setEditMainCategory,
                               handleEditMainCategory,
                               handleDeleteMainCategory,
                               inputstyle,
                               buttonstyle,
                               thstyle,
                           }) => {
    return (
        <table className="mx-auto w-[95%] bg-white">
            <thead>
            <tr>
                <th className={thstyle}>ID</th>
                <th className={thstyle}>大分類名稱</th>
                <th className={thstyle}>狀態</th>
                <th className={thstyle}>修改</th>
                <th className={thstyle}>刪除</th>
            </tr>
            </thead>
            <tbody>
            {maincategories.map((category) => (
                <tr key={category.mainid}>
                    <td className={thstyle}>{category.mainid}</td>
                    <td className={thstyle}>
                        {editMainCategory?.mainid === category.mainid ? (
                            <input
                                className={inputstyle}
                                value={editMainCategory.mainname}
                                onChange={(e) =>
                                    setEditMainCategory({ ...editMainCategory, mainname: e.target.value })
                                }
                            />
                        ) : (
                            category.mainname
                        )}
                    </td>
                    <td className={thstyle}>
                        {editMainCategory?.mainid === category.mainid ? (
                            <select
                                className={inputstyle}
                                value={editMainCategory.status}
                                onChange={(e) =>
                                    setEditMainCategory({ ...editMainCategory, status: e.target.value })
                                }
                            >
                                <option value="sale">上架中</option>
                                <option value="removed">下架</option>
                            </select>
                        ) : (
                            category.status
                        )}
                    </td>
                    <td className={thstyle}>
                        {editMainCategory?.mainid === category.mainid ? (
                            <button className={buttonstyle} onClick={handleEditMainCategory}>
                                保存
                            </button>
                        ) : (
                            <button
                                className={buttonstyle}
                                onClick={() => setEditMainCategory(category)}
                            >
                                修改
                            </button>
                        )}
                    </td>
                    <td className={thstyle}>
                        <button
                            className={buttonstyle}
                            onClick={() => handleDeleteMainCategory(category.mainid)}
                        >
                            刪除
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MainCategoryTable;