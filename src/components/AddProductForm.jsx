import {useState, useEffect, useCallback, useRef} from "react";

const AddProductForm = ({ onClose, product, onSubmit  }) => {
    const [formData, setFormData] = useState({
        productname: "",
        productdescription: "",
        maincategoryid: "",
        subcategoryid: "",
        supplierid: "",
        width: "",
        height: "",
        depth: "",
        unitprice: "",
        productcost: "",
        status: product?.status || "Active",
        updateAt: new Date().toISOString().split("T")[0], // 自動填入今天日期
        productColors: [{ colorname: "", stock: "", minstock: "", productImages: [{ imageurl: "", isprimary: false }] }],
    });

    const [selectedSale, setSelectedSale] = useState(null);
    const [mainCategory, setMainCategory] = useState([]); // 主類別選單
    const [subCategory, setSubCategory] = useState([]); // 副類別選單
    const [supplier, setSupplier] = useState([]); // 復類別選單
    const [error, setError] = useState(null);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
    const [newSupplier, setNewSupplier] = useState({
        name: "",
        address: "",
        phone: "",
        contactor: ""
    });


    useEffect(() => {
        if (product) {
            setFormData({
                productid: product.productid || "",
                productname: product.productname || "",
                productdescription: product.productdescription || "",
                maincategoryid: product.maincategoryid || "", // 下拉選單預設值
                subcategoryid: product.subcategoryid || "",
                supplierid: product.supplierid || "",
                width: product.width || "",
                height: product.height || "",
                depth: product.depth || "",
                unitprice: product.unitprice || "",
                productcost: product.productcost || "",
                status: product.status || "",
                updateat: product.updateat || new Date().toISOString().split("T")[0],
                productColors: product.productColors || [{ colorname: "", stock: "", minstock: "", productImages: [{ imageurl: "", isprimary: false }] }],
            });
        }else {

            setFormData({
                productname: "",
                productdescription: "",
                maincategoryid: "",
                subcategoryid: "",
                supplierid: "",
                width: "",
                height: "",
                depth: "",
                unitprice: "",
                productcost: "",
                status: "Active",
                updateat: new Date().toISOString().split("T")[0],
                productColors: [{ colorname: "", stock: "", minstock: "", productImages: [{ imageurl: "", isprimary: false }] }],
            });
        }
    }, [product]);

    // 主類別
    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/products/main");
                const data = await response.json();
                setMainCategory(data);
            } catch (error) {
                console.error("Failed to fetch main categories:", error);
            }
        };

        fetchMainCategories();
    }, []);

    useEffect(() => {
        if (!formData.maincategoryid) {
            setSelectedSale(null);
            return;
        }

        // 找出對應的主分類
        const selectedMainCategory = mainCategory.find(
            (main) => main.maincategoryid.toString() === formData.maincategoryid.toString()
        );

        // 設定當前活動
        setSelectedSale(selectedMainCategory?.sales || null);
    }, [formData.maincategoryid, mainCategory]);

    // 副類別
    useEffect(() => {
        const fetchSubCategories = async () => {
            if (!formData.maincategoryid) {
                setSubCategory([]);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/products/sub?mainCategoryId=${formData.maincategoryid}`);
                const data = await response.json();
                setSubCategory(data);
            } catch (error) {
                console.error("Failed to fetch subcategories:", error);
            }
        };

        fetchSubCategories();
    }, [formData.maincategoryid]);

    const fetchSupplier = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/products/searchSuppliers");
            const data = await response.json();
            setSupplier(data);

            const uniqueSuppliers = data.filter((supplier, index, self) =>
                index === self.findIndex((s) => s.name === supplier.name)
            );

            setSupplier(uniqueSuppliers);

        } catch (error) {
            console.error("Failed to fetch supplier:", error);
        }
    }, []);

    useEffect(() => {
        fetchSupplier();
    }, [fetchSupplier]);


    const handleAddSupplier = async () => {
        if (!newSupplier.name || !newSupplier.address || !newSupplier.phone || !newSupplier.contactor) {
            alert("請填寫完整的廠商資訊！");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/suppliers/addsupplier", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    supplierName: newSupplier.name,
                    supplierAddress: newSupplier.address,
                    supplierPhone: newSupplier.phone,
                    contactor: newSupplier.contactor
                })
            });

            if (!response.ok) {
                throw new Error("新增廠商失敗");
            }

            alert("廠商新增成功！");

            await fetchSupplier();

            setNewSupplier({ name: "", address: "", phone: "", contactor: "" });
            setShowAddSupplierModal(false);

        } catch (error) {
            console.error("Error adding supplier:", error);
            alert("新增失敗，請稍後再試！");
        }
    };

    const handleInputChange = (e, field, colorIndex = null, imageIndex = null) => {
        if (colorIndex !== null) {
            const updatedColors = [...formData.productColors];

            if (imageIndex !== null) {
                if (field === "isprimary") {
                    updatedColors[colorIndex].productImages = updatedColors[colorIndex].productImages.map((img, idx) => ({
                        ...img,
                        isprimary: idx === imageIndex ? e.target.checked : false
                    }));
                } else {
                    updatedColors[colorIndex].productImages[imageIndex][field] = e.target.value;
                }
            } else {
                updatedColors[colorIndex][field] = e.target.value;
            }

            setFormData({ ...formData, productColors: updatedColors });
        } else {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        }
    };

    // 新增顏色輸入行
    const addColorInput = () => {
        setFormData({
            ...formData,
            productColors: [
                ...formData.productColors,
                { colorname: "", stock: "", minstock: "", productImages: [{ imageurl: "", isprimary: false }] },
            ],
        });
    };

    // 新增圖片輸入行
    const addImageInput = (colorIndex) => {
        const updatedColors = [...formData.productColors];
        updatedColors[colorIndex].productImages.push({ imageurl: "", isprimary: false });
        setFormData({ ...formData, productColors: updatedColors });
    };
    const handleDeleteColor = async (colorId, colorIndex) => {
        if (!colorId) {

            const updatedColors = [...formData.productColors];
            updatedColors.splice(colorIndex, 1);
            setFormData({ ...formData, productColors: updatedColors });
            return;
        }

        const confirmDelete = window.confirm("確定要刪除這個顏色嗎？");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/products/deletecolor/${colorId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("刪除顏色失敗");
            }


            const updatedColors = formData.productColors.filter((color) => color.colorsid !== colorId);
            setFormData({ ...formData, productColors: updatedColors });

            alert("顏色刪除成功！");
        } catch (error) {
            console.error("Error deleting color:", error);
            alert("刪除顏色失敗！");
        }
    };


    // 提交表單
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.productname || !formData.maincategoryid || !formData.subcategoryid) {
            // alert("請填寫商品名稱、主類別及副類別！");
            return;
        }

        if (!formData.unitprice || isNaN(formData.unitprice) || Number(formData.unitprice) <= 0) {
            // alert("請輸入有效的單價！");
            return;
        }


        if (!formData.productColors.length || formData.productColors.some(color => !color.colorname.trim())) {
            // alert("請至少新增一個顏色並填寫名稱！");
            return;
        }
        let calculatedDiscountPrice = formData.unitprice;
        if (selectedSale && selectedSale.discount) {
            calculatedDiscountPrice = Math.round(
                formData.unitprice * (1 - selectedSale.discount / 100)
            );
        }



        const formattedData = {
            productname: formData.productname,
            width: formData.width.toString(),
            height: formData.height.toString(),
            depth: formData.depth.toString(),
            productdescription:formData.productdescription,
            unitprice: formData.unitprice.toString(),
            discountprice: calculatedDiscountPrice.toString(),
            productcost: formData.productcost.toString(),
            maincategoryid: formData.maincategoryid.toString(),
            subcategoryid: formData.subcategoryid.toString(),
            supplierid: formData.supplierid.toString(),
            status: formData.status,
            updateat: new Date().toISOString().split("T")[0],
            productColors: formData.productColors.map((color) => ({
                colorsid:color.colorsid,
                colorname: color.colorname,
                stock: color.stock.toString(),
                minstock: color.minstock.toString(),
                updateat:new Date().toISOString().split("T")[0],
                productImages: color.productImages.map((image) => ({
                    imageid: image.imageid,
                    imageurl: image.imageurl,
                    isprimary: image.isprimary === true || image.isprimary === "on",
                    updatedat:new Date().toISOString().split("T")[0],

                })),
            })),
        };

        console.log("Formatted Data:", formattedData);


        const url = product
            ? `http://localhost:8080/products/${product.productid}` // 更新 URL
            : "http://localhost:8080/products/add"; // 新增 URL
        const method = product ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error("Failed to save product");
            }

            alert(product ? "商品更新成功！" : "商品新增成功！");

            onClose();
            onSubmit(formData);
        } catch (err) {
            console.error("Error submitting product:", err);
            setError(err.message);
        }
    };


    const renderProductColors = () =>
        formData.productColors.map((color, colorIndex) => (
            <div key={colorIndex}>
                <label>顏色名稱:</label>
                <input
                    className={`${inputStyle} w-24 mx-2`}
                    type="text"
                    placeholder="顏色名稱"
                    value={color.colorname}
                    onChange={(e) => handleInputChange(e, "colorname", colorIndex)}
                />

                <label>庫存:</label>
                <input
                    className={`${inputStyle} w-24 mx-2`}
                    placeholder="庫存"
                    value={color.stock}
                    onChange={(e) => handleInputChange(e, "stock", colorIndex)}
                />
                <label>最低庫存數量:</label>
                <input
                    className={`${inputStyle} w-24 mx-2`}
                    placeholder="最低庫存"
                    value={color.minstock}
                    onChange={(e) => handleInputChange(e, "minstock", colorIndex)}
                />

                <h4>圖片</h4>
                {color.productImages.map((image, imageIndex) => (
                    <div key={imageIndex}>
                        <div className="flex items-center">
                            <input
                                className={inputStyle}
                                type="text"
                                placeholder="圖片 URL"
                                value={image.imageurl}
                                onChange={(e) => handleInputChange(e, "imageurl", colorIndex, imageIndex)}
                            />
                            {image.imageurl && (
                                <img
                                    src={image.imageurl}
                                    alt="預覽圖片"
                                    className="w-20 h-20 object-cover ml-2 rounded-lg shadow-md border"
                                />
                            )}
                            <label>
                                設為主要圖片
                                <input
                                    className={inputStyle}
                                    type="checkbox"
                                    checked={image.isprimary}
                                    onChange={(e) => handleInputChange(e, "isprimary", colorIndex, imageIndex)}
                                />
                            </label>
                        </div>

                    </div>
                    ))}
                <button
                    type="button"
                    onClick={() => addImageInput(colorIndex)}
                    className={buttonStyle2}>
                    新增圖片
                </button>
                {product && (
                    <button
                        type="button"
                        onClick={() => handleDeleteColor(color.colorsid, colorIndex)}
                        className={`${buttonStyle2} bg-red-500 hover:bg-red-600`}
                    >
                        刪除顏色
                    </button>
                )}
            </div>
        ));

    const inputStyle = "mt-4 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3";
    const buttonStyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[10%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
    const buttonStyle2 = "bg-[#8c8b88] text-white p-2 rounded-xl hover:bg-white hover:text-[#8c8b88] border border-[#8c8b88] w-40 mt-4";
    const spanStyle = "inline-block w-[22%]";
    const selectSpanStyle = "inline-block w-[20.5%]";

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[1000px] overflow-y-auto max-h-[90%] "
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl">新增商品</h2>
                    {error && <p style={{color: "red"}}>{error}</p>}

                    <div>
                        <label className={spanStyle}>商品名稱:(必填)</label>
                        <input
                            className={inputStyle}
                            placeholder="商品名稱"
                            type="text"
                            value={formData.productname}
                            onChange={(e) => handleInputChange(e, "productname")}
                        />
                    </div>

                    <div className="flex items-start w-[70%]">
                        <label className={`${spanStyle} w-[47%] mt-2`}>商品描述:</label>
                        <textarea
                            className={`${inputStyle} h-[200px] w-full`}
                            placeholder="商品描述"
                            type="text"
                            value={formData.productdescription}
                            onChange={(e) => handleInputChange(e, "productdescription")}
                        />
                    </div>


                    <div>
                        <label className={selectSpanStyle}>主類別:(必選)</label>
                        <div className="relative w-[28.5%] inline-block mx-3 mt-4">
                            <select
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                value={formData.maincategoryid}
                                onChange={(e) => handleInputChange(e, "maincategoryid")}
                            >
                                <option value="">選擇主類別</option>
                                {mainCategory.map((main) => (
                                    <option key={main.maincategoryid} value={main.maincategoryid}>
                                        {main.categoryname}
                                    </option>
                                ))}
                            </select>
                            <div
                                className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none text-gray-700">
                                ▼
                            </div>
                        </div>
                    </div>
                    <div>
                        {selectedSale && (
                            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                                <span className=" font-semibold">目前活動: {selectedSale.salesname}</span>
                                <span className="text-gray-700">{selectedSale.salesdesc}</span>
                                <p className="text-red-500 font-bold">折扣: {selectedSale.discount}%</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={selectSpanStyle}>副類別:(必選)</label>
                        <div className="relative w-[28.5%] inline-block mx-3 mt-4">
                            <select
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                value={formData.subcategoryid}
                                onChange={(e) => handleInputChange(e, "subcategoryid")}
                            >
                                <option value="">選擇副類別</option>
                                {subCategory.map((sub) => (
                                    <option key={sub.subcategoryid} value={sub.subcategoryid}>
                                        {sub.categoryname}
                                    </option>
                                ))}
                            </select>
                            <div
                                className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none text-gray-700">
                                ▼
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={selectSpanStyle}>商品狀態:</label>
                        <div className="relative w-[28.5%] inline-block mx-3 mt-4">
                            <select
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                value={formData.status || "Active"}
                                onChange={(e) => handleInputChange(e, "status")}
                            >
                                <option value="">選擇狀態</option>
                                <option value="Active"> 上架中</option>
                                <option value="Deactivate"> 下架中</option>
                            </select>
                            <div
                                className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none text-gray-700">

                                ▼
                            </div>
                        </div>
                    </div>


                    <div>
                        <label className={selectSpanStyle}>廠商:</label>
                        <div className="relative w-[28.5%] inline-block mx-3 mt-4">
                            <select
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                value={formData.supplierid}
                                onChange={(e) => handleInputChange(e, "supplierid")}
                            >
                                <option value="">選擇廠商</option>
                                {supplier.map((sup) => (
                                    <option key={sup.supplierid} value={sup.supplierid}>
                                        {sup.name}
                                    </option>
                                ))}
                            </select>
                            <div
                                className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none text-gray-700">
                                ▼
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowAddSupplierModal(true)}
                            className={`${buttonStyle} ml-3 w-[120px]`}
                        >
                            ➕ 新增廠商
                        </button>
                    </div>
                    <div>
                        {showAddSupplierModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-w-[500px]">
                                    <h2 className="text-xl mb-4">新增廠商</h2>

                                    <input
                                        className={inputStyle}
                                        type="text"
                                        placeholder="廠商名稱"
                                        value={newSupplier.name}
                                        onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                                    />
                                    <input
                                        className={inputStyle}
                                        type="text"
                                        placeholder="廠商地址"
                                        value={newSupplier.address}
                                        onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                                    />
                                    <input
                                        className={inputStyle}
                                        type="text"
                                        placeholder="電話號碼"
                                        value={newSupplier.phone}
                                        onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                                    />
                                    <input
                                        className={inputStyle}
                                        type="text"
                                        placeholder="聯絡人"
                                        value={newSupplier.contactor}
                                        onChange={(e) => setNewSupplier({...newSupplier, contactor: e.target.value})}
                                    />

                                    <div className="flex justify-center mt-4">
                                        <button
                                            className={`${buttonStyle} mx-2`}
                                            onClick={handleAddSupplier}
                                        >
                                            新增
                                        </button>
                                        <button
                                            className={`${buttonStyle} mx-2`}
                                            onClick={() => setShowAddSupplierModal(false)}
                                        >
                                            取消
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    <div>
                        <label className={spanStyle}>商品尺寸 (寬x高x深):</label>
                        <input
                            className={`${inputStyle} w-20`}
                            type="text"
                            placeholder="寬"
                            value={formData.width}
                            onChange={(e) => handleInputChange(e, "width")}
                        />
                        <input
                            className={`${inputStyle} w-20`}
                            type="text"
                            placeholder="高"
                            value={formData.height}
                            onChange={(e) => handleInputChange(e, "height")}
                        />
                        <input
                            className={`${inputStyle} w-20`}
                            type="text"
                            placeholder="深"
                            value={formData.depth}
                            onChange={(e) => handleInputChange(e, "depth")}
                        />
                    </div>
                    <div>
                        <label className={spanStyle}>單價:(必填)</label>
                        <input
                            className={inputStyle}
                            placeholder="單價"
                            type="text"
                            value={formData.unitprice}
                            onChange={(e) => handleInputChange(e, "unitprice")}
                        />
                    </div>
                    <div>
                        <label className={spanStyle}>成本價:</label>
                        <input
                            className={inputStyle}
                            placeholder="成本價"
                            type="text"
                            value={formData.productcost}
                            onChange={(e) => handleInputChange(e, "productcost")}
                        />
                    </div>


                    <div className="mt-6 text-xl">商品顏色(必填)</div>

                    <button
                        type="button"
                        onClick={addColorInput}
                        className={buttonStyle2}
                    >
                        新增顏色
                    </button>
                    {renderProductColors()}
                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className={`${buttonStyle} w-40 mt-4 mx-3`}
                        >{product ? "保存" : "新增商品"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`${buttonStyle} w-40 mt-4`}
                        >
                            取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;