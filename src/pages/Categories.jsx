import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {
    fetchMainCategories,
    fetchSubCategories,
    addMainCategory,
    addSubCategory,
    updateMainCategory,
    updateSubCategory,
    deleteMainCategory,
    deleteSubCategory,
} from "../services/categoryApi";

const Categories = () => {
    const [maincategories, setmaincategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedMainId, setSelectedMainId] = useState(null);

    const [formData, setFormData] = useState({
        categoryname: '',
        status: 'sale',
    });
    const [subFormData, setSubFormData] = useState({
        categoryname: '',
        status: 'sale',
    });
    const [editMainCategory, setEditMainCategory] = useState(null);
    const [editSubCategory, setEditSubCategory] = useState(null);

    useEffect(() => {
        fetchMainCategories()
            .then(setmaincategories)
            .catch((error) => console.error("Error fetching main categories:", error));
    }, []);

    useEffect(() => {
        if (selectedMainId) {
            fetchSubCategories(selectedMainId)
                .then(setSubcategories)
                .catch((error) => console.error("Error fetching subcategories:", error));
        } else {
            setSubcategories([]);
        }
    }, [selectedMainId]);

    const handleMainCategoryChange = (e) => {
        setSelectedMainId(Number(e.target.value));
    };


    const handleChange = (e, type = "main") => {
        const {name, value} = e.target;
        if (type === "main") {
            setFormData({...formData, [name]: value});
        } else {
            setSubFormData({...subFormData, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMainCategory(formData);

            const updatedCategories = await fetchMainCategories();
            setmaincategories(updatedCategories);

            setFormData({ categoryname: "", status: "sale" });

        } catch (error) {
            console.error("Error adding main category:", error);
        }
    };


    const handleSubSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMainId) {
            alert("請選擇一個主分類！");
            return;
        }
        try {
            const updatedSubFormData = {
                categoryname: subFormData.categoryname,
                status: subFormData.status,
                mainCategory: { maincategoryid: Number(selectedMainId) },
            };
            const newSubcategory = await addSubCategory(updatedSubFormData);


            if (newSubcategory && newSubcategory.subcategoryid) {
                setSubcategories(prev => [...prev, newSubcategory]);
            } else {
                console.warn("API 未回傳完整數據，重新 fetch");
                const updatedSubcategories = await fetchSubCategories(selectedMainId);
                setSubcategories(updatedSubcategories);
            }

            setSubFormData({ categoryname: "", status: "sale" });

        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };

    const handleEditClick = (category) => {
        setEditMainCategory(category);
    };

    const handleEditMainCategory = () => {
        if (!editMainCategory) return;
        updateMainCategory(editMainCategory.maincategoryid, editMainCategory)
            .then(() => fetchMainCategories())
            .then(setmaincategories)
            .catch((error) => console.error("Error updating main category:", error));

        setEditMainCategory(null);
    };

    const handleEditSubCategory = () => {
        if (!editSubCategory) return;
        updateSubCategory(editSubCategory.subcategoryid, editSubCategory)
            .then(() => fetchSubCategories(selectedMainId))
            .then(setSubcategories)
            .catch((error) => console.error("Error updating subcategory:", error));

        setEditSubCategory(null);
    };

    const handleDeleteMainCategory = (maincategoryid) => {
        if (!window.confirm("確定要刪除這個大分類及其所有子分類嗎？")) return;

        deleteMainCategory(maincategoryid)
            .then(() => fetchMainCategories())
            .then(setmaincategories)
            .catch((error) => console.error("Error deleting main category:", error));
    };

    const handleDeleteSubCategory = (subcategoryid) => {
        if (!window.confirm("確定要刪除這個小分類嗎？")) return;

        deleteSubCategory(subcategoryid)
            .then(() => fetchSubCategories(selectedMainId))
            .then(setSubcategories)
            .catch((error) => console.error("Error deleting subcategory:", error));
    };

    const inputstyle = "border border-[#161E24] focus:outline-none p-2 rounded-xl mr-1 ";
    const buttonstyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
    const thstyle = "border border-[#161E24] text-left p-4";

    return (
        <div className="w-full bg-[#A6A6A6] h-screen pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[95%]">
                <div className="text-2xl">
                    <Link to="/productpage" className="hover:font-bold">商品管理</Link>
                    <span> / </span>
                    <span className="bg-[#27333f] p-2 text-white rounded-xl">分類管理</span>
                </div>

                <div className=" pr-4 border-r border-gray-400 flex w-full">
                    <div className=" w-[50%]">
                        <h2 className="text-xl font-bold mb-4 mt-6">大分類管理</h2>
                        <form onSubmit={handleSubmit} className="my-4 mx-3">
                            <input
                                placeholder="請輸入大分類"
                                className={`${inputstyle} w-[22%]`}
                                name="categoryname"
                                value={formData.categoryname}
                                onChange={(e) => handleChange(e, "main")}
                            />
                            <div className="relative w-[22%] inline-block mx-3">
                                <select
                                    className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                    name="status"
                                    value={formData.status}
                                    onChange={(e) => handleChange(e, "main")}
                                >
                                    <option value="sale">上架中</option>
                                    <option value="removed">下架</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼
                                </div>
                            </div>
                            <button className={buttonstyle}>新增大分類</button>
                        </form>

                        <div className="w-full overflow-x-auto max-h-[1000px]">
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
                                {maincategories.map((category, index) => (
                                    <tr key={category.maincategoryid || `temp-${index}`}>
                                        <td className={thstyle}>{category.maincategoryid}</td>
                                        <td className={thstyle}>
                                            {editMainCategory?.maincategoryid === category.maincategoryid ? (
                                                <input
                                                    className={inputstyle}
                                                    value={editMainCategory?.categoryname || ""}
                                                    onChange={(e) =>
                                                        setEditMainCategory({
                                                            ...editMainCategory,
                                                            categoryname: e.target.value
                                                        })
                                                    }
                                                />
                                            ) : (
                                                category.categoryname
                                            )}
                                        </td>
                                        <td className={thstyle}>
                                            {editMainCategory?.maincategoryid === category.maincategoryid ? (
                                                <select
                                                    className={inputstyle}
                                                    value={editMainCategory?.status || ""}
                                                    onChange={(e) =>
                                                        setEditMainCategory({
                                                            ...editMainCategory,
                                                            status: e.target.value
                                                        })
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
                                            {editMainCategory?.maincategoryid === category.maincategoryid ? (
                                                <button className={buttonstyle} onClick={handleEditMainCategory}>
                                                    保存
                                                </button>
                                            ) : (
                                                <button
                                                    className={buttonstyle}
                                                    onClick={() => handleEditClick(category)}
                                                >
                                                    修改
                                                </button>
                                            )}
                                        </td>
                                        <td className={thstyle}>
                                            <button
                                                className={buttonstyle}
                                                onClick={() => handleDeleteMainCategory(category.maincategoryid)}
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

                    <div className="w-[50%]">
                        <div className="w-1/2 pl-3 ">
                            <h2 className="text-xl font-bold mb-1 mt-5">小分類管理</h2>
                            <div className="flex w-[200%] items-center">
                            <div className="relative mx-1 w-[25%] mt-4">
                                <select
                                    className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                    name="status"
                                    onChange={handleMainCategoryChange}
                                >
                                    <option value="">選擇大分類</option>
                                    {maincategories.map((category) => (
                                        <option key={category.maincategoryid} value={category.maincategoryid}>
                                            {category.categoryname}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼
                                </div>
                            </div>

                            <form onSubmit={handleSubSubmit} className="flex items-center mt-4 ml-2 ">
                                <input
                                    placeholder="新增小分類"
                                    className={`${inputstyle} w-[35%]`}
                                    name="categoryname"
                                    value={subFormData.categoryname}
                                    onChange={(e) => handleChange(e, "sub")}
                                />
                                <div className="relative w-[40%] inline-block mx-3">
                                    <select
                                        className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                        name="status"
                                        value={subFormData.status}
                                        onChange={(e) => handleChange(e, "sub")}
                                    >
                                        <option value="sale">上架中</option>
                                        <option value="removed">下架</option>
                                    </select>
                                    <div
                                        className="absolute inset-y-0 right-3 flex items-center justify-center pointer-events-none text-gray-700">
                                        ▼
                                    </div>
                                </div>
                                <button className={buttonstyle}>新增</button>
                            </form>
                        </div>
                        </div>

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
                                <tr key={subcategory.subcategoryid}>
                                    <td className={thstyle}>{subcategory.subcategoryid}</td>
                                    <td className={thstyle}>
                                        {editSubCategory?.subcategoryid === subcategory.subcategoryid ? (
                                            <input
                                                className={inputstyle}
                                                value={editSubCategory.categoryname}
                                                onChange={(e) =>
                                                    setEditSubCategory({
                                                        ...editSubCategory,
                                                        categoryname: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            subcategory.categoryname
                                        )}
                                    </td>
                                    <td className={thstyle}>
                                        {editSubCategory?.subcategoryid === subcategory.subcategoryid ? (
                                            <select
                                                className={inputstyle}
                                                value={editSubCategory.status}
                                                onChange={(e) =>
                                                    setEditSubCategory({...editSubCategory, status: e.target.value})
                                                }
                                            >
                                                <option value="sale">上架中</option>
                                                <option value="removed">下架</option>
                                            </select>
                                        ) : (
                                            subcategory.status
                                        )}
                                    </td>
                                    <td className={thstyle}>
                                        {editSubCategory?.subcategoryid === subcategory.subcategoryid ? (
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
                                        <button className={buttonstyle}
                                                onClick={() => handleDeleteSubCategory(subcategory.subcategoryid)}>
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
        </div>

    )
        ;
};

export default Categories;