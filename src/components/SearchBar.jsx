const SearchBar = ({
                       formData,
                       categories,
                       subCategories,
                       handleChange,
                       handleCategoryChange,
                   }) => {
    const inputStyle = "mt-4 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3";

    return (
        <div>
            <input
                placeholder="用商品名稱搜尋"
                name="productNameSearch"
                className={inputStyle}
                value={formData.productNameSearch}
                onChange={handleChange}
            />
            <div className="relative w-[13%] inline-block mr-3">
                <select
                    className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                    name="categorySearch"
                    value={formData.categorySearch}
                    onChange={handleCategoryChange}
                >
                    <option value="">選擇大分類</option>
                    {categories.map((category) => (
                        <option key={category.mainid} value={category.mainid}>
                            {category.mainname}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼</div>
            </div>
            <div className="relative w-[13%] inline-block">
                <select
                    className="w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl"
                    name="subCategorySearch"
                    value={formData.subCategorySearch}
                    onChange={handleChange}
                >
                    <option value="">選擇小分類</option>
                    {subCategories.map((subCategory) => (
                        <option key={subCategory.subid} value={subCategory.subid}>
                            {subCategory.subname}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼</div>
            </div>
        </div>
    );
};

export default SearchBar;