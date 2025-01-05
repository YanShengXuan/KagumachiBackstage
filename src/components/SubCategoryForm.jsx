const SubCategoryForm = ({
                             subFormData,
                             maincategories,
                             handleChange,
                             handleSubSubmit,
                             handleMainCategoryChange,
                             inputstyle,
                             buttonstyle,
                         }) => {
    return (
        <div>
            <div className="relative w-[20%] inline-block mx-10">
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
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼</div>
            </div>

            <form onSubmit={handleSubSubmit} className="flex items-center mt-4 ml-10">
                <input
                    placeholder="新增小分類"
                    className={inputstyle}
                    name="subname"
                    value={subFormData.subname}
                    onChange={(e) => handleChange(e, "sub")}
                />
                <div className="relative w-[10%] inline-block mx-3">
                    <select
                        className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                        name="substatus"
                        value={subFormData.substatus}
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
    );
};

export default SubCategoryForm;