const ProductFormModal = ({
                              isModalOpen,
                              isEditMode,
                              formData,
                              categories,
                              subCategories,
                              handleChange,
                              handleMainCategoryChange,
                              handleImageChange,
                              handleSubmit,
                              closeModal,
                          }) => {
    if (!isModalOpen) return null;

    const inputStyle = "mt-4 border border-[#161E24] focus:outline-none p-2 rounded-xl mr-3";
    const selectStyle =
        "w-full px-4 py-2 border border-[#161E24] text-gray-700 focus:outline-none appearance-none rounded-xl";
    const spanStyle = "inline-block w-[22%]";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
                <h2 className="text-xl font-bold mb-4">{isEditMode ? "更新商品" : "新增商品"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <span className={spanStyle}>商品名稱：</span>
                        <input
                            placeholder="商品名稱"
                            name="productname"
                            className={inputStyle}
                            value={formData.productname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-8">
                        <span className={spanStyle}>分類：</span>
                        <div className="relative w-[20%] inline-block mr-4">
                            <select
                                name="maincategoryid"
                                value={formData.maincategoryid}
                                onChange={handleMainCategoryChange}
                                className={selectStyle}
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

                        <div className="relative w-[20%] inline-block">
                            <select
                                name="subcategoryid"
                                value={formData.subcategoryid}
                                onChange={handleChange}
                                className={selectStyle}
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

                    <div className="mt-4">
                        <span className={spanStyle}>寬度 高度 深度：</span>
                        <input
                            placeholder="寬度"
                            name="width"
                            className={`${inputStyle} w-[10%]`}
                            value={formData.width}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="高度"
                            name="height"
                            className={`${inputStyle} w-[10%]`}
                            value={formData.height}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="深度"
                            name="depth"
                            className={`${inputStyle} w-[10%]`}
                            value={formData.depth}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>單價：</span>
                        <input
                            placeholder="單價"
                            name="unitprice"
                            className={inputStyle}
                            value={formData.unitprice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>折扣後價格：</span>
                        <input
                            placeholder="折扣後價格"
                            name="discountprice"
                            className={inputStyle}
                            value={formData.discountprice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>成本：</span>
                        <input
                            placeholder="成本"
                            name="productcost"
                            className={inputStyle}
                            value={formData.productcost}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>庫存：</span>
                        <input
                            placeholder="庫存"
                            name="unitsinstock"
                            className={inputStyle}
                            value={formData.unitsinstock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>最低庫存數量：</span>
                        <input
                            placeholder="最低庫存數量"
                            name="minstock"
                            className={inputStyle}
                            value={formData.minstock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-8">
                        <span className={spanStyle}>商品狀態：</span>
                        <div className="relative w-[20%] inline-block">
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={selectStyle}
                            >
                                <option value="sale">上架中</option>
                                <option value="removed">已下架</option>
                                <option value="out of stock">停售</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">▼</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>商品描述：</span>
                        <textarea
                            placeholder="商品描述"
                            name="productdescription"
                            className={`${inputStyle} w-full`}
                            value={formData.productdescription}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <span className={spanStyle}>圖片：</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-6"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="bg-[#876D5A] text-white px-4 py-2 rounded"
                        >
                            {isEditMode ? "更新" : "新增"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;