import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const tableThStyle = "border-2 border-black text-center text-xl";
const tableTdStyle = "border-2 border-black text-center text-xl px-6";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    width: "40%",
    height: "40%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
  },
};

function OrderItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const orderDetailsUrl = `http://localhost:8080/order/details/${props.id}`;
  const openModal = () => {
    setModalIsOpen(true);
    fetch(orderDetailsUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error:" + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setModalDetails(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <tr>
        <td className={tableTdStyle}>{props.date}</td>
        <td className={tableTdStyle}>
          <button className="underline hover:text-blue-500" onClick={openModal}>
            {props.orderSerial}
          </button>
        </td>
        <td className={tableTdStyle}>{props.name}</td>
        <td className={tableTdStyle}>{props.city}</td>
        <td className={tableTdStyle}>{props.payMethod}</td>
        <td className={tableTdStyle}>{props.totalPrice}</td>
        <td className={tableTdStyle}>{props.status}</td>
        <td className={tableTdStyle}>{props.logisticsSerial}</td>
      </tr>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <table className="w-[100%] border-collapse overflow-auto">
          <thead>
            <tr>
              <th className={tableThStyle}>名稱</th>
              <th className={tableThStyle}>顏色</th>
              <th className={tableThStyle}>售價</th>
              <th className={tableThStyle}>數量</th>
            </tr>
          </thead>
          <tbody>
            {modalDetails.map((data) => (
              <tr key={data.orderdetailid}>
                <td className={tableThStyle}>{data.productname}</td>
                <td className={tableThStyle}>{data.colorname}</td>
                <td className={tableThStyle}>{data.price}</td>
                <td className={tableThStyle}>{data.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
}
export default OrderItem;
