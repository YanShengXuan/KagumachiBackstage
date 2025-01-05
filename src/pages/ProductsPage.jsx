import {Link} from "react-router-dom";
import {useState, useEffect} from "react"

const ProductsPage = () => {
    const [product, setProduct] = useState([]);
    const [formData, setFormData] = useState({
        productNameSearch: '',
        categorySearch: '',
        productname: '',
        categoryid: '',
        unitprice: '',
        discountprice: '',
        width: '',
        height: '',
        depth: '',
        productcost: '',
        unitsinstock: '',
        minstock: '',
        image: '',
        status: '',
        productdescription: '',
        updateat: new Date().toISOString().split('T')[0],
    });
    //新增視窗開關
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({...formData, image: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isEditMode
            ? `http://localhost:8080/products/update/${editProductId}` // 更新
            : "http://localhost:8080/products/addProduct"; // 新增

        const method = isEditMode ? "PUT" : "POST";

        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                alert(isEditMode ? "商品更新成功！" : "商品新增成功！");
                setFormData({
                    productNameSearch: '',
                    categorySearch: '',
                    productname: '',
                    categoryid: '',
                    unitprice: '',
                    discountprice: '',
                    width: '',
                    height: '',
                    depth: '',
                    productcost: '',
                    unitsinstock: '',
                    minstock: '',
                    image: '',
                    status: '',
                    productdescription: '',
                    updateat: new Date().toISOString().split('T')[0],
                });
                setIsModalOpen(false);
                setIsEditMode(false);
                setEditProductId(null);
                fetch("http://localhost:8080/products/showAllProducts")
                    .then((response) => response.json())
                    .then((data) => setProduct(data));
            })
            .catch((error) => {
                console.error("Error while saving/updating product:", error);
                alert(isEditMode ? "商品更新失敗！" : "商品新增失敗！");
            });
    };


    useEffect(() => {
        fetch("http://localhost:8080/products/showAllProducts")
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleEdit = (item) => {
        setIsModalOpen(true);
        setIsEditMode(true);
        setEditProductId(item.productid);
        setFormData({
            productname: item.productname,
            categoryid: item.categoryid,
            unitprice: item.unitprice,
            discountprice: item.discountprice,
            width: item.width,
            height: item.height,
            depth: item.depth,
            productcost: item.productcost,
            unitsinstock: item.unitsinstock,
            minstock: item.minstock,
            image: item.image,
            status: item.status,
            productdescription: item.productdescription,
            updateat: new Date().toISOString().split('T')[0],
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("要刪除此商品？")) {
            fetch(`http://localhost:8080/products/delete/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((message) => {
                    alert(message || "刪除成功！");
                    setProduct(product.filter((item) => item.productid !== id));
                })
                .catch((error) => {
                    console.error("Error while deleting product:", error);
                    alert("刪除失敗！");
                });
        }
    };
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditProductId(null);
    };


    const inputstyle = "mt-4 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3";
    const thstyle = "border border-[#161E24] text-left p-4";
    const buttonstyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[10%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
    const spanstyle = "inline-block w-[22%]";
    return (
        <div className="w-full bg-[#A6A6A6] h-full pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[95%]">
                <Link to="/"> 用戶列表</Link>


                <div>
                    <div className="text-2xl my-2">
                        <span className="bg-[#27333f] p-2 text-white rounded-xl">商品管理</span>
                        <span> / </span>
                        <Link to="/categories" className="hover:font-bold">分類管理</Link>
                    </div>

                    <input placeholder="用商品名稱搜尋"
                           name="productNameSearch"
                           className={inputstyle}
                           value={formData.productNameSearch}
                           onChange={handleChange}
                    />
                    <input placeholder="用分類搜尋"
                           name="categorySearch"
                           className={inputstyle}
                           value={formData.categorySearch}
                           onChange={handleChange}
                    />
                    <button
                        className={buttonstyle}>搜尋
                    </button>
                    <button
                        onClick={openModal}
                        className={`${buttonstyle} mx-4`}
                    >

                        新增商品
                    </button>
                </div>


                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
                            <h2 className="text-xl font-bold mb-4">{isEditMode ? "更新商品" : "新增商品"}</h2>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <span className={spanstyle}>商品名稱：</span>
                                        <input placeholder="商品名稱"
                                               name="productname"
                                               className={inputstyle}
                                               value={formData.productname}
                                               onChange={handleChange}
                                        />

                                    </div>
                                    <div>
                                        <span className={spanstyle}>商品分類ID：</span>
                                        <input placeholder="商品分類ID"
                                               name="categoryid"
                                               className={inputstyle}
                                               value={formData.categoryid}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <span className={spanstyle}>寬度 高度 深度：</span>
                                        <input placeholder="寬度"
                                               name="width"
                                               className={`${inputstyle} w-[10%]`}
                                               value={formData.width}
                                               onChange={handleChange}
                                        />
                                        <input placeholder="高度"
                                               name="height"
                                               className={`${inputstyle} w-[10%]`}
                                               value={formData.height}
                                               onChange={handleChange}
                                        />
                                        <input placeholder="深度"
                                               name="depth"
                                               className={`${inputstyle} w-[10%]`}
                                               value={formData.depth}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <span className={spanstyle}>單價：</span>
                                        <input placeholder="單價"
                                               name="unitprice"
                                               className={inputstyle}
                                               value={formData.unitprice}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <span className={spanstyle}>折扣後價格：</span>
                                        <input placeholder="折扣後價格"
                                               name="discountprice"
                                               className={inputstyle}
                                               value={formData.discountprice}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <span className={spanstyle}>成本：</span>
                                        <input placeholder="成本"
                                               name="productcost"
                                               className={inputstyle}
                                               value={formData.productcost}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <span className={spanstyle}>庫存：</span>
                                        <input placeholder="庫存"
                                               name="unitsinstock"
                                               className={inputstyle}
                                               value={formData.unitsinstock}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <span className={spanstyle}>最低庫存數量：</span>
                                        <input placeholder="最低庫存數量"
                                               name="minstock"
                                               className={inputstyle}
                                               value={formData.minstock}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-4 py-2  relative">
                                        <span className={spanstyle}>商品狀態：</span>
                                        <div className="relative w-[20%] inline-block">
                                            <select
                                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                                name="status"
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                            >
                                                <option value="sale">上架中</option>
                                                <option value="removed">已下架</option>
                                                <option value="out of stock">停售</option>

                                            </select>
                                            <div
                                                className="absolute inset-y-0  right-4 flex items-center pointer-events-none">
                                                ▼
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={spanstyle}>商品描述：</span>
                                        <input placeholder="商品描述"
                                               name="productdescription"
                                               className={inputstyle}
                                               value={formData.productdescription}
                                               onChange={handleChange}
                                        />

                                    </div>


                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="file"
                                        onChange={handleImageChange}
                                        className="mt-6"
                                    />
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        取消
                                    </button>

                                    <button className={buttonstyle}>{isEditMode ? "更新" : "新增"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {/*<div className=" mt-6">*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        id="file"*/}
                {/*        className="hidden"*/}
                {/*        onChange="document.getElementById('file-label').textContent = this.files[0]?.name || '尚未選取檔案'"*/}
                {/*    />*/}
                {/*    <label*/}
                {/*        htmlFor="file"*/}
                {/*        className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded-lg"*/}
                {/*    >*/}
                {/*        選擇EXCEL*/}
                {/*    </label>*/}
                {/*    <span id="file-label" className="ml-2">尚未選取檔案</span>*/}
                {/*</div>*/}

                <div className="mt-10 w-[100%] overflow-x-auto">
                    <table className="text-xs min-w-[1600px] table-fixed">
                        <thead>
                        <tr>
                            <th className={`${thstyle} w-[50px] min-w-[50px]`}>ID</th>
                            <th className={`${thstyle} w-[200px] min-w-[200px]`}>商品名稱</th>
                            <th className={`${thstyle} w-[120px] min-w-[120px]`}>商品分類</th>
                            <th className={`${thstyle} w-[150px] min-w-[150px]`}>寬度、高度、深度</th>
                            <th className={`${thstyle} w-[80px] min-w-[80px]`}>單價</th>
                            <th className={`${thstyle} w-[100px] min-w-[110px]`}>折扣後價格</th>
                            <th className={`${thstyle} w-[100px] min-w-[100px]`}>成本</th>
                            <th className={`${thstyle} w-[80px] min-w-[80px]`}>庫存</th>
                            <th className={`${thstyle} w-[100px] min-w-[120px]`}>最低庫存數量</th>
                            <th className={`${thstyle} w-[150px] min-w-[150px]`}>圖片</th>
                            <th className={`${thstyle} w-[120px] min-w-[120px]`}>商品狀態</th>
                            <th className={`${thstyle} w-[120px] min-w-[120px]`}>總共售出數量</th>
                            <th className={`${thstyle} w-[120px] min-w-[120px]`}>評價</th>
                            <th className={`${thstyle} w-[120px] min-w-[120px]`}>商品描述</th>
                            <th className={`${thstyle} w-[150px] min-w-[150px]`}>更新日期</th>
                            <th className={`${thstyle} w-[100px] min-w-[100px]`}>修改</th>
                            <th className={`${thstyle} w-[100px] min-w-[100px]`}>刪除</th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.map((item) => (
                            <tr key={item.id}>
                                <td className={thstyle}>{item.productid}</td>
                                <td className={thstyle}>{item.productname}</td>
                                <td className={thstyle}>{item.categoryid}</td>
                                <td className={thstyle}>{item.width} × {item.height} × {item.depth}</td>
                                <td className={thstyle}>{item.unitprice}</td>
                                <td className={thstyle}>{item.discountprice}</td>
                                <td className={thstyle}>{item.productcost}</td>
                                <td className={thstyle}>{item.unitsinstock}</td>
                                <td className={thstyle}>{item.minstock}</td>
                                <td className={thstyle}>
                                    <img
                                        src={item.image}
                                        alt={item.productname}
                                        style={{width: "100px", height: "100px"}}
                                    />
                                </td>
                                <td className={thstyle}>{item.status}</td>
                                <td className={thstyle}>{item.unitsold}</td>
                                <td className={thstyle}>{item.rating}</td>
                                <td className={thstyle}>{item.productdescription}</td>
                                <td className={thstyle}>{item.updateat}</td>
                                <td className={thstyle}>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-[#876D5A] text-white px-2 py-1 rounded"
                                    >
                                        更新
                                    </button>
                                </td>
                                <td className={thstyle}>
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
            </div>
        </div>
            )
            };

            export default ProductsPage;