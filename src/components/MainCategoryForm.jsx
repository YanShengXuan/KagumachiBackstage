const MainCategoryForm = ({ formData, handleChange, handleSubmit, inputstyle, buttonstyle }) => {
    return (
        <form onSubmit={handleSubmit} className="my-10">
            <input
                placeholder="請輸入大分類"
                className={inputstyle}
                name="mainname"
                value={formData.mainname}
                onChange={(e) => handleChange(e, "main")}
            />
            <div className="relative w-[10%] inline-block mx-3">
                <select
                    className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                    name="status"
                    value={formData.status}
                    onChange={(e) => handleChange(e, "main")}
                >
                    <option value="sale">上架中</option>
                    <option value="removed">下架</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼</div>
            </div>
            <button className={buttonstyle}>新增大分類</button>
        </form>
    );
};

export default MainCategoryForm;