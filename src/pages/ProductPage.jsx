import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AddProductForm from "../components/AddProductForm.jsx";


const ProductPage = () => {
        const [products, setProducts] = useState([]);
        const [isFormVisible, setIsFormVisible] = useState(false);
        const [currentProduct, setCurrentProduct] = useState(null);

        const [searchParams, setSearchParams] = useState({
            productname: "",
            maincategoryid: "",
            subcategoryid: "",
        });

        const fetchProductList = async () => {
            try {
                let url = "http://localhost:8080/products";

                const queryParams = new URLSearchParams();
                if (searchParams.productname) queryParams.append("productname", searchParams.productname);
                if (searchParams.maincategoryid) queryParams.append("maincategoryid", searchParams.maincategoryid);
                if (searchParams.subcategoryid) queryParams.append("subcategoryid", searchParams.subcategoryid);

                if (queryParams.toString()) {
                    url = `http://localhost:8080/products/search?${queryParams.toString()}`;
                }

                const response = await fetch(url, {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch product list");
                }

                const data = await response.json();
                setProducts(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };

        useEffect(() => {
            const delaySearch = setTimeout(() => {
                fetchProductList();
            }, 500);

            return () => clearTimeout(delaySearch);
        }, [searchParams]);


        const [mainCategories, setMainCategories] = useState([]);
        const [subCategories, setSubCategories] = useState([]);

        useEffect(() => {
            const fetchMainCategories = async () => {
                try {
                    const response = await fetch("http://localhost:8080/products/main");
                    if (!response.ok) {
                        throw new Error("Failed to fetch main categories");
                    }
                    const data = await response.json();
                    setMainCategories(data);
                } catch (error) {
                    console.error("Error fetching main categories:", error);
                }
            };

            fetchMainCategories();
        }, []);

        useEffect(() => {
            const fetchSubCategories = async () => {
                if (!searchParams.maincategoryid) {
                    setSubCategories([]);
                    return;
                }

                try {
                    const response = await fetch(`http://localhost:8080/products/sub?mainCategoryId=${searchParams.maincategoryid}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch subcategories");
                    }
                    const data = await response.json();
                    setSubCategories(data);
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                }
            };

            fetchSubCategories();
        }, [searchParams.maincategoryid]);

        const handleSearchInputChange = (e) => {
            setSearchParams((prev) => ({...prev, [e.target.name]: e.target.value}));
        };

        // const handleSearch = () => {
        //     fetchProductList(searchParams);
        // };

        useEffect(() => {
            fetchProductList();
        }, []);


        // 打开编辑表单
        const handleEdit = (product) => {
            setCurrentProduct(product);
            setIsFormVisible(true);
        };

        const handleDelete = async (productid) => {
            if (!window.confirm("確定要刪除？")) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/products/delete/${productid}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("刪除商品失敗");
                }

                alert("商品刪除成功！");
                setProducts((prevProducts) => prevProducts.filter((p) => p.productid !== productid));
            } catch (error) {
                console.error("刪除商品錯誤:", error);
                alert("刪除失敗，請稍後再試！");
            }
        };


        const handleFormSubmit = () => {
            fetchProductList();
            setIsFormVisible(false);
            setCurrentProduct(null);
        };


        const inputstyle = "mt-4 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3";
        const thstyle = "border border-[#161E24] text-left p-4";
        const buttonstyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[10%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";

        return (
            <div className="w-full bg-[#A6A6A6] h-full pt-10 ">
                <div className="w-[91%] ml-6 bg-[rgb(216,216,216)] p-4 rounded-xl ">
                    <div>
                        <div className="text-2xl my-2">
                            <span className="bg-[#27333f] p-2 text-white rounded-xl">商品管理</span>
                            <span> / </span>
                            <Link to="/categories" className="hover:font-bold">分類管理</Link>
                        </div>

                        <input
                            type="text"
                            name="productname"
                            value={searchParams.productname}
                            onChange={handleSearchInputChange}
                            placeholder="輸入商品名稱"
                            className={inputstyle}
                        />

                        <div className="relative w-[13%] inline-block mr-3">
                            <select
                                name="maincategoryid"
                                value={searchParams.maincategoryid}
                                onChange={handleSearchInputChange}
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"

                            >
                                <option value="">選擇大分類</option>
                                {mainCategories.map((category) => (
                                    <option key={category.maincategoryid} value={category.maincategoryid}>
                                        {category.categoryname}
                                    </option>
                                ))}

                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼
                            </div>

                        </div>
                        <div className="relative w-[13%] inline-block">
                            <select
                                name="subcategoryid"
                                value={searchParams.subcategoryid}
                                onChange={handleSearchInputChange}
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                            >
                                <option value="">選擇小分類</option>
                                {subCategories.map((subcategory) => (
                                    <option key={subcategory.subcategoryid} value={subcategory.subcategoryid}>
                                        {subcategory.categoryname}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼
                            </div>
                        </div>


                        <button
                            className={`${buttonstyle} mx-4`}
                            onClick={() => setIsFormVisible(!isFormVisible)}
                        >
                            新增商品
                        </button>

                        {isFormVisible && (
                            <div className="mt-6">
                                <AddProductForm
                                    onClose={() => setIsFormVisible(false)}
                                />
                            </div>
                        )}
                    </div>


                    <div className="mt-10 w-[100%] overflow-x-auto overflow-auto max-h-[75vh]">
                        <table className=" min-w-[1600px] table-fixed bg-white ">
                            <thead>
                            <tr>
                                <th className={`${thstyle} min-w-[50px]`}>ID</th>
                                <th className={`${thstyle} min-w-[200px]`}>商品名稱</th>
                                <th className={`${thstyle} min-w-[160px]`}>商品分類</th>
                                <th className={`${thstyle} min-w-[120px]`}>廠商</th>
                                <th className={`${thstyle} min-w-[220px]`}>寬度、高度、深度</th>
                                <th className={`${thstyle} min-w-[150px]`}>顏色</th>
                                <th className={`${thstyle} min-w-[100px]`}>單價</th>
                                <th className={`${thstyle} min-w-[100px]`}>折扣後價格</th>
                                <th className={`${thstyle} min-w-[100px]`}>成本</th>
                                <th className={`${thstyle} min-w-[80px]`}>庫存</th>
                                <th className={`${thstyle} min-w-[110px]`}>最低庫存數量</th>
                                <th className={`${thstyle} min-w-[150px]`}>圖片</th>
                                {/*<th className={`${thstyle} min-w-[120px]`}>商品狀態</th>*/}
                                {/*<th className={`${thstyle} min-w-[120px]`}>總共售出數量</th>*/}
                                {/*<th className={`${thstyle} min-w-[80px]`}>評價</th>*/}
                                {/*<th className={`${thstyle} min-w-[250px]`}>商品描述</th>*/}
                                <th className={`${thstyle} min-w-[150px]`}>更新日期</th>
                                <th className={`${thstyle} min-w-[100px]`}>修改</th>
                                <th className={`${thstyle} min-w-[100px]`}>刪除</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => {
                                if (!product.productColors || product.productColors.length === 0) {
                                    return (
                                        <tr key={product.productid}>
                                            <td className={thstyle}>{product.productid}</td>
                                            <td className={thstyle}>{product.productname}</td>
                                            <td className={thstyle}>
                                                {product.mainCategory?.categoryname || "無主類別"}
                                                {" > "}
                                                {product.subCategory?.categoryname || "無副類別"}
                                            </td>
                                            <td className={thstyle}>{product.suppliers?.name || "無供應商"}</td>
                                            <td className={thstyle}>W: {product.width} X H: {product.productheight} X
                                                D: {product.depth}</td>
                                            <td className={thstyle}>無顏色</td>
                                            <td className={thstyle}>{product.unitprice}</td>
                                            <td className={thstyle}>{product.discountprice}</td>
                                            <td className={thstyle}>{product.productcost}</td>
                                            <td className={thstyle}>-</td>
                                            <td className={thstyle}>-</td>
                                            <td className={thstyle}>無圖片</td>
                                            <td className={thstyle}>{product.status}</td>
                                            <td className={thstyle}>{product.unitsold}</td>
                                            <td className={thstyle}>{product.rating}</td>
                                            <td className={`${thstyle} overflow-y-auto max-h-[1px]`}>{product.productdescription}</td>
                                            <td className={thstyle}>{new Date(product.updateat).toLocaleDateString()}</td>
                                        </tr>
                                    );
                                }
                                return product.productColors.map((color) => (
                                    <tr key={`${product.productid}-${color.colorsid}`}>
                                        <td className={thstyle}>{product.productid}</td>
                                        <td className={thstyle}>{product.productname}</td>
                                        <td className={thstyle}>
                                            {product.mainCategory?.categoryname || "無主類別"}
                                            {" > "}
                                            {product.subCategory?.categoryname || "無副類別"}
                                        </td>
                                        <td className={thstyle}>{product.suppliers?.name || "無供應商"}</td>
                                        <td className={thstyle}>W: {product.width} X H: {product.height} X
                                            D: {product.depth}</td>
                                        <td className={thstyle}>
                                            {color.colorname}
                                        </td>
                                        <td className={thstyle}>{product.unitprice}</td>
                                        <td className={thstyle}>{product.mainCategory?.sales?.discount
                                            ? (product.mainCategory.sales.discount * product.unitprice) // 保留兩位小數
                                            : "無折扣"}</td>
                                        <td className={thstyle}>{product.productcost}</td>
                                        <td className={thstyle}>{color.stock}</td>
                                        <td className={thstyle}>{color.minstock}</td>
                                        <td className={thstyle}>
                                            {color.productImages
                                                .filter((image) => image.isprimary)
                                                .map((image) => (
                                                    <img
                                                        key={image.imageid}
                                                        src={image.imageurl}
                                                        alt="Product"
                                                        className="w-50 h-50"
                                                    />
                                                ))}
                                        </td>
                                        {/*<td className={thstyle}>{product.status}</td>*/}
                                        {/*<td className={thstyle}>{product.unitsold}</td>*/}
                                        {/*<td className={thstyle}>{product.rating}</td>*/}
                                        {/*<td className={`${thstyle} p-1.5 m-0 h-26`}>*/}
                                        {/*    <div*/}
                                        {/*        className="overflow-y-auto h-[150px]"*/}
                                        {/*    >*/}
                                        {/*        {product.productdescription}*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                        <td className={thstyle}>{new Date(product.updateat).toLocaleDateString()}</td>
                                        <td className={thstyle}>

                                            <button className="bg-[rgb(83,87,89)]  text-white px-2 py-1 rounded" onClick={() => handleEdit(product)}>修改</button>
                                        </td>
                                        <td className={thstyle}>
                                            <button
                                                className="bg-[rgb(83,87,89)] text-white px-2 py-1 rounded"
                                                onClick={() => handleDelete(product.productid)}
                                            >
                                                刪除
                                            </button>
                                        </td>


                                    </tr>
                                ))
                                    ;
                            })}


                            </tbody>
                        </table>
                    </div>
                </div>
                {isFormVisible && (
                    <AddProductForm
                        product={currentProduct}
                        onClose={() => setIsFormVisible(false)}
                        onSubmit={handleFormSubmit}
                    />
                )}
            </div>
        );
    }
;

export default ProductPage;