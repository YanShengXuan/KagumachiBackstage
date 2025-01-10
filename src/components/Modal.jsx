// eslint-disable-next-line react/prop-types
function Modal({ onClose }) {
  const buttonstyle =
    "mt-1 bg-[rgb(83,87,89)] text-white p-2 rounded-xl w-[20%] hover:bg-white hover:text-[rgb(83,87,89)] border border-[rgb(83,87,89)]";

  return (
    <div className=" fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-white p-5 shadow-sm shadow-stone-200 gap-3 text-black relative rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute top-2 right-2"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <h1 className="font-bold text-xl">新增廠商</h1>
        <div className="text-lg">
          廠商名稱：<input type="text" className="border rounded mt-1"></input>
          <br />
          家具分類：<input type="text" className="border rounded mt-1"></input>
          <br />
          廠商地址：<input type="text" className="border rounded mt-1"></input>
          <br />
          廠商聯絡電話：
          <input type="text" className="border rounded mt-1"></input>
          <br />
          廠商聯絡人：
          <input type="text" className="border rounded mt-1"></input>
          <br />
        </div>
        <div className="flex justify-center items-center mt-4">
          <button className={buttonstyle}>送出</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
