function OrderManagement() {
  return (
    <>
      <div className="flex bg-gray-400 h-screen">
        <div className="basis-1/4 border-2 border-black text-center">
          我是選單
        </div>
        <div className="flex flex-col basis-3/4 border-2 border-black">
          <div className="basis-1/4 border-2 border-black">
            <div>各月份訂單數量</div>
            <div>各縣市訂單數量</div>
          </div>
          <div className="basis-3/4 border-2 border-black">
            <div>時間選單</div>
            <div>金額選單</div>
            <div>狀態選單</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
