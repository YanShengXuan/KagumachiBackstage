import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const WarningModal = ({ isOpen, onClose, title, message, button }) => {
  return (
    <Dialog as="div" className="relative z-10" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-80" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
          <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
            {title}
          </DialogTitle>
          <div className="mt-4">
            <p className="text-lg text-gray-500">{message}</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded"
              onClick={onClose}
            >
              確認
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
    // <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
    //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25" />
    //   <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
    //     <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
    //     <p className="mt-2 text-gray-600">{message}</p>
    //     <button
    //       className="mt-4 px-4 py-2 bg-gray-400 text-black rounded"
    //       onClick={onClose}
    //     >
    //       確定
    //     </button>
    //   </DialogPanel>
    // </Dialog>
  );
};

export default WarningModal;
