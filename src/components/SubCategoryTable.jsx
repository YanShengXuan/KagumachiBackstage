const SubCategoryTable = ({
                              subcategories,
                              editSubCategory,
                              setEditSubCategory,
                              handleEditSubCategory,
                              handleDeleteSubCategory,
                              inputstyle,
                              buttonstyle,
                              thstyle,
                          }) => {
    return (
        <table className="mx-auto w-[95%] bg-white mt-4">
            <thead>
            <tr>
                <th className={thstyle}>ID</th>
                <th className={thstyle}>小分類名稱</th>
                <th className={thstyle}>狀態</th>
                <th className={thstyle}>修改</th>
                <th className={thstyle}>刪除</th>
            </tr>
            </thead>
            <tbody>
            {subcategories.map((subcategory) => (
                <tr key={subcategory.subid}>
                    <td className={thstyle}>{subcategory.subid}</td>
                    <td className={thstyle}>
                        {editSubCategory?.subid === subcategory.subid ? (
                            <input
                                className={inputstyle}
                                value={editSubCategory.subname}
                                onChange={(e) =>
                                    setEditSubCategory({ ...editSubCategory, subname: e.target.value })
                                }
                            />
                        ) : (
                            subcategory.subname
                        )}
                    </td>
                    <td className={thstyle}>
                        {editSubCategory?.subid === subcategory.subid ? (
                            <select
                                className={inputstyle}
                                value={editSubCategory.substatus}
                                onChange={(e) =>
                                    setEditSubCategory({ ...editSubCategory, substatus: e.target.value })
                                }
                            >
                                <option value="sale">上架中</option>
                                <option value="removed">下架</option>
                            </select>
                        ) : (
                            subcategory.substatus
                        )}
                    </td>
                    <td className={thstyle}>
                        {editSubCategory?.subid === subcategory.subid ? (
                            <button className={buttonstyle} onClick={handleEditSubCategory}>
                                保存
                            </button>
                        ) : (
                            <button
                                className={buttonstyle}
                                onClick={() => setEditSubCategory(subcategory)}
                            >
                                修改
                            </button>
                        )}
                    </td>
                    <td className={thstyle}>
                        <button
                            className={buttonstyle}
                            onClick={() => handleDeleteSubCategory(subcategory.subid)}
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

export default SubCategoryTable;