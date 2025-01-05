import { useState } from "react";
import Modal from "../components/Modal";

function SupplierManagement() {
  const categories = {
    櫃子: ["衣櫃", "鞋櫃", "書櫃", "櫥櫃", "電視櫃", "浴櫃"],
    桌子: ["餐桌", "茶几", "書桌", "升降桌"],
    椅子: ["餐椅", "椅凳", "辦公椅", "電競椅", "吧檯椅"],
    沙發: ["單人", "雙人", "L型"],
    燈具: ["坎燈", "吊燈", "檯燈", "壁燈"],
    寢具: ["床架", "床墊", "床包/棉被/枕頭"],
  };

  const [suppiler, setSupplier] = useState(""); //廠商
  const [mainCategory, setMainCategory] = useState(""); // 分類

  const handleSupplierChange = (e) => setSupplier(e.target.vlue);
  const handleMainCategoryChange = (e) => {
    setMainCategory(e.target.value);
  };

  const handleSearch = () => {
    // 搜尋廠商API
    console.log({ suppiler, mainCategory });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  function switchModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="min-h-screen bg-slate-600 p-5 text-lg text-white space-y-4">
      {/* 廠商選單 */}
      <div>
        <label className="block font-medium mb-2">
          廠商:
          <select
            value={suppiler}
            onChange={handleSupplierChange}
            className="block mt-1 w-full p-2 rounded border border-gray-300 text-black"
          >
            <option value="">請選擇廠商</option>
            <option value="廠商A">廠商A</option>
            <option value="廠商B">廠商B</option>
            <option value="廠商C">廠商C</option>
          </select>
        </label>
      </div>

      {/* 家具分類 */}
      <div>
        <label className="block font-medium mb-2">
          家具分類:
          <select
            value={mainCategory}
            onChange={handleMainCategoryChange}
            className="block mt-1 w-full p-2 rounded border border-gray-300 text-black"
          >
            <option value="">請選擇分類</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* 搜尋按鈕 */}
      <div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          搜尋
        </button>
      </div>

      <div>
        {/*控制modal開關*/}
        {isModalOpen ? <Modal onClose={switchModal} /> : null}
        <button
          onClick={switchModal}
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          新增廠商
        </button>
      </div>

      {/* 分隔線 */}
      <hr className="my-4 border-gray-400" />

      {/* 搜尋結果表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-white border-collapse border border-gray-400">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 border border-gray-400">數量</th>
              <th className="p-2 border border-gray-400">廠商名稱</th>
              <th className="p-2 border border-gray-400">家具分類</th>
              <th className="p-2 border border-gray-400">廠商地址</th>
              <th className="p-2 border border-gray-400">廠商聯絡電話</th>
              <th className="p-2 border border-gray-400">廠商聯絡人</th>
              <th className="p-2 border border-gray-400">商品狀態</th>
              <th className="p-2 border border-gray-400">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-400">1</td>
              <td className="p-2 border border-gray-400">廠商A</td>
              <td className="p-2 border border-gray-400">椅子</td>
              <td className="p-2 border border-gray-400">
                408台中市南屯區公益路二段51號18樓
              </td>
              <td className="p-2 border border-gray-400">0423265860</td>
              <td className="p-2 border border-gray-400">資先生</td>
              <td className="p-2 border border-gray-400">上架中</td>
              <td className="p-2 border border-gray-400">
                <button className="px-2 py-1 bg-gray-500 rounded text-black hover:bg-gray-400">
                  編輯
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-400">2</td>
              <td className="p-2 border border-gray-400">廠商A</td>
              <td className="p-2 border border-gray-400">椅子</td>
              <td className="p-2 border border-gray-400">
                408台中市南屯區公益路二段51號18樓
              </td>
              <td className="p-2 border border-gray-400">0423265860</td>
              <td className="p-2 border border-gray-400">資先生</td>
              <td className="p-2 border border-gray-400">上架中</td>
              <td className="p-2 border border-gray-400">
                <button className="px-2 py-1 bg-gray-500 rounded text-black hover:bg-gray-400">
                  編輯
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-400">3</td>
              <td className="p-2 border border-gray-400">廠商A</td>
              <td className="p-2 border border-gray-400">椅子</td>
              <td className="p-2 border border-gray-400">
                408台中市南屯區公益路二段51號18樓
              </td>
              <td className="p-2 border border-gray-400">0423265860</td>
              <td className="p-2 border border-gray-400">資先生</td>
              <td className="p-2 border border-gray-400">上架中</td>
              <td className="p-2 border border-gray-400">
                <button className="px-2 py-1 bg-gray-500 rounded text-black hover:bg-gray-400">
                  編輯
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierManagement;
