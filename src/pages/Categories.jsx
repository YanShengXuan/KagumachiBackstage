import {Link} from "react-router-dom";
import {useState, useEffect} from "react"

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


    useEffect(() => {
        if (selectedMainId) {
            fetch(`http://localhost:8080/categories/main/${selectedMainId}/sub`)
                .then((response) => response.json())
                .then((data) => setSubcategories(data))
                .catch((error) => console.error("Error fetching subcategories:", error));
        } else {
            setSubcategories([]);
        }
    }, [selectedMainId]);

    const handleMainCategoryChange = (e) => {
        const mainId = e.target.value;
        setSelectedMainId(mainId);
        // console.log(mainId)
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        console.log(formData);
        fetch("http://localhost:8080/categories/main", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setFormData({
                    mainname: '',
                    status: 'sale',

                });
                fetch("http://localhost:8080/categories/main")
                    .then((response) => response.json())
                    .then((data) => setmaincategories(data));
            })
            .catch((error) => {
                console.error("Error while saving/updating product:", error);
            });
    };
    useEffect(() => {
        fetch("http://localhost:8080/categories/main")
            .then((response) => response.json())
            .then((data) => setmaincategories(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleSubSubmit = (e) => {
        e.preventDefault();

        if (!selectedMainId) {
            alert("請選擇一個主分類！");
            return;
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...subFormData, mainid: selectedMainId}),
        };

        fetch("http://localhost:8080/categories/sub", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                setSubFormData({
                    subname: '',
                    substatus: 'sale'
                });
                // 重新獲取小分類列表
                fetch(`http://localhost:8080/categories/main/${selectedMainId}/sub`)
                    .then((response) => response.json())
                    .then((data) => setSubcategories(data));
            })
            .catch((error) => console.error("Error saving subcategory:", error));
    };
    const handleEditMainCategory = () => {
        if (!editMainCategory) return;
        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editMainCategory),
        };
        fetch(`http://localhost:8080/categories/main/${editMainCategory.mainid}`, options)
            .then((response) => response.json())
            .then(() => {
                setEditMainCategory(null);
                fetch("http://localhost:8080/categories/main")
                    .then((response) => response.json())
                    .then((data) => setmaincategories(data));
            })
            .catch((error) => console.error("Error updating main category:", error));
    };

    // 修改小分類
    const handleEditSubCategory = () => {
        if (!editSubCategory) return;
        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editSubCategory),
        };
        fetch(`http://localhost:8080/categories/sub/${editSubCategory.subid}`, options)
            .then((response) => response.json())
            .then(() => {
                setEditSubCategory(null);
                fetch(`http://localhost:8080/categories/main/${selectedMainId}/sub`)
                    .then((response) => response.json())
                    .then((data) => setSubcategories(data));
            })
            .catch((error) => console.error("Error updating subcategory:", error));
    };


    const inputstyle = "border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3";
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
                <form className="my-10" onSubmit={handleSubmit}>

                    <input
                        placeholder="請輸入大分類"
                        className={inputstyle}
                        name="mainname"
                        value={formData.mainname}
                        onChange={handleChange}
                    ></input>
                    <div className="relative w-[10%] inline-block mr-3">
                        <select
                            className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="sale">上架中</option>
                            <option value="removed">下架</option>
                        </select>
                        <div
                            className="absolute inset-y-0  right-4 flex items-center pointer-events-none">
                            ▼
                        </div>
                    </div>

                    <button className={buttonstyle}>新增大分類</button>
                </form>
                <hr className="my-10 border-white"/>

                <div className="flex">
                    <div className="w-[50%]">
                        <div className="relative w-[70%] inline-block">
                            <select
                                className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                name="status"
                                onChange={handleMainCategoryChange}
                            >
                                <option value="">選擇大分類</option>
                                {maincategories.map((category) => (
                                    <option key={category.mainid} value={category.mainid}>
                                        {category.mainname}
                                    </option>
                                ))}
                            </select>
                            <div
                                className="absolute inset-y-0  right-4 flex items-center pointer-events-none">
                                ▼
                            </div>
                        </div>
                        <div>
                            <form onSubmit={handleSubSubmit} className="flex items-center space-x-3 mt-4">
                                <input
                                    placeholder="新增小分類"
                                    className={inputstyle}
                                    name="subname"
                                    value={subFormData.subname}
                                    onChange={(e) => setSubFormData({...subFormData, subname: e.target.value})}
                                />
                                <div className="relative w-[30%] inline-block">
                                    <select
                                        className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                                        name="substatus"
                                        value={subFormData.substatus}
                                        onChange={(e) => setSubFormData({...subFormData, substatus: e.target.value})}
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
                    <table className="mx-12 w-[80%]">
                        <thead>
                        <tr>
                            <th className={thstyle}>ID</th>
                            <th className={thstyle}>小分類名稱</th>
                            <th className={thstyle}>狀態</th>
                            <th className={thstyle}>修改</th>
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
                                                setEditSubCategory({...editSubCategory, subname: e.target.value})
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
                                                setEditSubCategory({...editSubCategory, substatus: e.target.value})
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Categories;