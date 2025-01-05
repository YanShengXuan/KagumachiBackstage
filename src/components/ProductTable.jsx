const ProductTable = ({ product, mainCategoryMap, subCategoryMap, handleEdit, handleDelete }) => {
    const thStyle = "border border-[#161E24] text-left p-4";

    return (
        <div className="overflow-x-auto w-full bg-[#F5F5F5] mt-8">
            <table className="text-xs min-w-[1600px] table-fixed bg-white">
                <thead>
                <tr>
                    <th className={`${thStyle}`}>ID</th>
                    <th className={`${thStyle}`}>商品名稱</th>
                    <th className={`${thStyle}`}>商品分類</th>
                    <th className={`${thStyle}`}>廠商ID</th>
                    <th className={`${thStyle}`}>寬度 × 高度 × 深度</th>
                    <th className={`${thStyle}`}>單價</th>
                    <th className={`${thStyle}`}>折扣後價格</th>
                    <th className={`${thStyle}`}>成本</th>
                    <th className={`${thStyle}`}>庫存</th>
                    <th className={`${thStyle}`}>最低庫存數量</th>
                    <th className={`${thStyle}`}>圖片</th>
                    <th className={`${thStyle}`}>商品狀態</th>
                    <th className={`${thStyle}`}>總共售出數量</th>
                    <th className={`${thStyle}`}>評價</th>
                    <th className={`${thStyle}`}>商品描述</th>
                    <th className={`${thStyle}`}>更新日期</th>
                    <th className={`${thStyle}`}>修改</th>
                    <th className={`${thStyle}`}>刪除</th>
                </tr>
                </thead>
                <tbody>
                {product.map((item) => (
                    <tr key={item.productid}>
                        <td className={thStyle}>{item.productid}</td>
                        <td className={thStyle}>{item.productname}</td>
                        <td className={thStyle}>
                            {mainCategoryMap[item.maincategoryid]} > {subCategoryMap[item.subcategoryid]}
                        </td>
                        <td className={thStyle}>{item.supplierid}</td>
                        <td className={thStyle}>{`${item.width} × ${item.height} × ${item.depth}`}</td>
                        <td className={thStyle}>{item.unitprice}</td>
                        <td className={thStyle}>{item.discountprice}</td>
                        <td className={thStyle}>{item.productcost}</td>
                        <td className={thStyle}>{item.unitsinstock}</td>
                        <td className={thStyle}>{item.minstock}</td>
                        <td className={thStyle}>
                            <img src={item.image} alt={item.productname} className="w-24 h-24 object-cover" />
                        </td>
                        <td className={thStyle}>{item.status}</td>
                        <td className={thStyle}>{item.unitsold}</td>
                        <td className={thStyle}>{item.rating}</td>
                        <td className={thStyle}>{item.productdescription}</td>
                        <td className={thStyle}>{item.updateat}</td>
                        <td className={thStyle}>
                            <button
                                className="bg-[#876D5A] text-white px-2 py-1 rounded"
                                onClick={() => handleEdit(item)}
                            >
                                更新
                            </button>
                        </td>
                        <td className={thStyle}>
                            <button
                                className="bg-[#ff9ea2] text-white px-3 py-1 rounded hover:bg-red-700"
                                onClick={() => handleDelete(item.productid)}
                            >
                                刪除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;