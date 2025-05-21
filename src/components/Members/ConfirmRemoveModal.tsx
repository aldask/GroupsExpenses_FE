import React from "react";

interface ConfirmRemoveModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmRemoveModal: React.FC<ConfirmRemoveModalProps> = ({
  onConfirm,
  onCancel,
}) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="confirm-remove-title"
    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
  >
    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
      <h3
        id="confirm-remove-title"
        className="text-xl font-bold mb-4 text-gray-900"
      >
        Confirm Removal
      </h3>
      <p className="mb-6 text-gray-700">
        Are you sure you want to remove this member?
      </p>
      <div className="flex justify-center gap-6">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        >
          Yes, remove
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-5 py-2 rounded-xl font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmRemoveModal;
