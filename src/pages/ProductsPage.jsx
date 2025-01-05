import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    fetchCategories,
    fetchSubCategoryMap,
    fetchSubCategories,
    fetchAllProducts,
    searchProducts,
    deleteProduct,
    addOrUpdateProduct,
} from "../services/productapi";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import ProductFormModal from "../components/ProductFormModal";

const ProductsPage = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [mainCategoryMap, setMainCategoryMap] = useState({});
    const [subCategoryMap, setSubCategoryMap] = useState({});
    const [formData, setFormData] = useState({
        productNameSearch: "",
        categorySearch: "",
        subCategorySearch: "",
        productname: "",
        maincategoryid: "",
        subcategoryid: "",
        unitprice: "",
        discountprice: "",
        width: "",
        height: "",
        depth: "",
        productcost: "",
        unitsinstock: "",
        minstock: "",
        image: "",
        status: "sale",
        productdescription: "",
        updateat: new Date().toISOString().split("T")[0],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        // Fetch main categories and products
        fetchCategories().then((data) => {
            setCategories(data);
            const map = {};
            data.forEach((category) => {
                map[category.mainid] = category.mainname;
            });
            setMainCategoryMap(map);
        });

        fetchAllProducts().then(setProduct);

        // Fetch subcategory map
        fetchSubCategoryMap().then(setSubCategoryMap);
    }, []);

    useEffect(() => {
        // Dynamic search products
        handleSearch();
    }, [formData.productNameSearch, formData.categorySearch, formData.subCategorySearch]);

    const handleSearch = () => {
        const params = {
            name: formData.productNameSearch || "",
            mainCategoryId: formData.categorySearch || "",
            subCategoryId: formData.subCategorySearch || "",
        };
        searchProducts(params).then(setProduct);
    };

    const handleCategoryChange = (e) => {
        const mainCategoryId = e.target.value;
        setFormData({ ...formData, categorySearch: mainCategoryId, subCategorySearch: "" });

        if (mainCategoryId) {
            fetchSubCategories(mainCategoryId).then(setSubCategories);
        } else {
            setSubCategories([]);
        }
    };

    const handleMainCategoryChange = (e) => {
        const mainCategoryId = e.target.value;
        setFormData({ ...formData, maincategoryid: mainCategoryId, subcategoryid: "" });

        if (mainCategoryId) {
            fetchSubCategories(mainCategoryId).then(setSubCategories);
        } else {
            setSubCategories([]);
        }
    };

    const openModal = () => {
        setFormData({
            productNameSearch: "",
            categorySearch: "",
            subCategorySearch: "",
            productname: "",
            maincategoryid: "",
            subcategoryid: "",
            unitprice: "",
            discountprice: "",
            width: "",
            height: "",
            depth: "",
            productcost: "",
            unitsinstock: "",
            minstock: "",
            image: "",
            status: "sale",
            productdescription: "",
            updateat: new Date().toISOString().split("T")[0],
        });
        setIsModalOpen(true);
        setIsEditMode(false);
    };

    const handleEdit = (item) => {
        setIsModalOpen(true);
        setIsEditMode(true);
        setEditProductId(item.productid);
        setFormData({
            productname: item.productname,
            maincategoryid: item.maincategoryid,
            subcategoryid: item.subcategoryid,
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
            updateat: item.updateat,
        });

        if (item.maincategoryid) {
            fetchSubCategories(item.maincategoryid).then(setSubCategories);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditMode
            ? `http://localhost:8080/products/update/${editProductId}`
            : "http://localhost:8080/products/addProduct";
        const method = isEditMode ? "PUT" : "POST";

        addOrUpdateProduct(url, method, formData)
            .then(() => {
                alert(isEditMode ? "商品更新成功！" : "商品新增成功！");
                setIsModalOpen(false);
                setIsEditMode(false);
                fetchAllProducts().then(setProduct);
            })
            .catch((err) => {
                console.error("提交商品出錯：", err);
                alert("操作失敗！");
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("要刪除此商品？")) {
            deleteProduct(id).then(() => {
                setProduct((prev) => prev.filter((item) => item.productid !== id));
                alert("商品刪除成功！");
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditProductId(null);
    };

    return (
        <div className="w-full bg-[#A6A6A6] h-full pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-full">
                <div className="text-2xl my-2">
                    <span className="bg-[#27333f] p-2 text-white rounded-xl">商品管理</span>
                    <span> / </span>
                    <Link to="/categories" className="hover:font-bold">
                        分類管理
                    </Link>
                </div>

                <SearchBar
                    formData={formData}
                    categories={categories}
                    subCategories={subCategories}
                    handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    handleCategoryChange={handleCategoryChange}
                />

                <button
                    className="bg-[#535759] text-white p-2 rounded-xl w-[10%] hover:bg-white hover:text-[#535759] border border-[#535759] mt-6"
                    onClick={openModal}
                >
                    新增商品
                </button>

                <ProductTable
                    product={product}
                    mainCategoryMap={mainCategoryMap}
                    subCategoryMap={subCategoryMap}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

                <ProductFormModal
                    isModalOpen={isModalOpen}
                    isEditMode={isEditMode}
                    formData={formData}
                    categories={categories}
                    subCategories={subCategories}
                    handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    handleMainCategoryChange={handleMainCategoryChange}
                    handleImageChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setFormData({ ...formData, image: reader.result });
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            </div>
        </div>
    );
};

export default ProductsPage;