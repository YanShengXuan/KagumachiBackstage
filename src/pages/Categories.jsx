import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainCategoryForm from "../components/MainCategoryForm";
import MainCategoryTable from "../components/MainCategoryTable";
import SubCategoryForm from "../components/SubCategoryForm";
import SubCategoryTable from "../components/SubCategoryTable";
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
        mainname: '',
        status: 'sale',
    });
    const [subFormData, setSubFormData] = useState({
        subname: '',
        substatus: 'sale',
    });
    const [editMainCategory, setEditMainCategory] = useState(null);
    const [editSubCategory, setEditSubCategory] = useState(null);
    const [isEditingMainCategories, setIsEditingMainCategories] = useState(true);

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
        setSelectedMainId(e.target.value);
    };

    const toggleMainCategoryEdit = () => {
        setIsEditingMainCategories(!isEditingMainCategories);
    };

    const handleChange = (e, type = "main") => {
        const { name, value } = e.target;
        if (type === "main") {
            setFormData({ ...formData, [name]: value });
        } else {
            setSubFormData({ ...subFormData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMainCategory(formData)
            .then(() => {
                setFormData({ mainname: '', status: 'sale' });
                return fetchMainCategories();
            })
            .then(setmaincategories)
            .catch((error) => console.error("Error adding main category:", error));
    };

    const handleSubSubmit = (e) => {
        e.preventDefault();

        if (!selectedMainId) {
            alert("請選擇一個主分類！");
            return;
        }

        addSubCategory({ ...subFormData, mainid: selectedMainId })
            .then(() => {
                setSubFormData({ subname: '', substatus: 'sale' });
                return fetchSubCategories(selectedMainId);
            })
            .then(setSubcategories)
            .catch((error) => console.error("Error adding subcategory:", error));
    };

    const handleEditMainCategory = () => {
        if (!editMainCategory) return;

        updateMainCategory(editMainCategory.mainid, editMainCategory)
            .then(() => {
                setEditMainCategory(null);
                return fetchMainCategories();
            })
            .then(setmaincategories)
            .catch((error) => console.error("Error updating main category:", error));
    };

    const handleEditSubCategory = () => {
        if (!editSubCategory) return;

        updateSubCategory(editSubCategory.subid, editSubCategory)
            .then(() => {
                setEditSubCategory(null);
                return fetchSubCategories(selectedMainId);
            })
            .then(setSubcategories)
            .catch((error) => console.error("Error updating subcategory:", error));
    };

    const handleDeleteMainCategory = (mainid) => {
        if (!window.confirm("確定要刪除這個大分類嗎？")) return;

        deleteMainCategory(mainid)
            .then(fetchMainCategories)
            .then(setmaincategories)
            .catch((error) => console.error("Error deleting main category:", error));
    };

    const handleDeleteSubCategory = (subid) => {
        if (!window.confirm("確定要刪除這個小分類嗎？")) return;

        deleteSubCategory(subid)
            .then(() => fetchSubCategories(selectedMainId))
            .then(setSubcategories)
            .catch((error) => console.error("Error deleting subcategory:", error));
    };

    const inputstyle = "border border-[#161E24] focus:outline-none p-2 rounded-xl mr-1";
    const buttonstyle = "bg-[rgb(83,87,89)] text-white p-2 rounded-xl hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";
    const thstyle = "border border-[#161E24] text-left p-4";

    return (
        <div className="w-full bg-[#A6A6A6] h-full pt-10">
            <div className="w-[95%] mx-auto bg-[rgb(216,216,216)] p-4 rounded-xl h-[95%]">
                <div className="text-2xl">
                    <Link to="/productspage" className="hover:font-bold">商品管理</Link>
                    <span> / </span>
                    <span className="bg-[#27333f] p-2 text-white rounded-xl">分類管理</span>
                </div>

                <MainCategoryForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    inputstyle={inputstyle}
                    buttonstyle={buttonstyle}
                />

                <hr className="my-10 border-white" />

                <button
                    className={`${buttonstyle} mb-4 ml-10`}
                    onClick={toggleMainCategoryEdit}
                >
                    {isEditingMainCategories ? "查看小分類" : "修改大分類"}
                </button>

                {isEditingMainCategories ? (
                    <MainCategoryTable
                        maincategories={maincategories}
                        editMainCategory={editMainCategory}
                        setEditMainCategory={setEditMainCategory}
                        handleEditMainCategory={handleEditMainCategory}
                        handleDeleteMainCategory={handleDeleteMainCategory}
                        inputstyle={inputstyle}
                        buttonstyle={buttonstyle}
                        thstyle={thstyle}
                    />
                ) : (
                    <>
                        <SubCategoryForm
                            maincategories={maincategories}
                            subFormData={subFormData}
                            handleChange={handleChange}
                            handleSubSubmit={handleSubSubmit}
                            handleMainCategoryChange={handleMainCategoryChange}
                            inputstyle={inputstyle}
                            buttonstyle={buttonstyle}
                        />

                        <SubCategoryTable
                            subcategories={subcategories}
                            editSubCategory={editSubCategory}
                            setEditSubCategory={setEditSubCategory}
                            handleEditSubCategory={handleEditSubCategory}
                            handleDeleteSubCategory={handleDeleteSubCategory}
                            inputstyle={inputstyle}
                            buttonstyle={buttonstyle}
                            thstyle={thstyle}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Categories;