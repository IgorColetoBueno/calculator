import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      data-open={isOpen}
      className={`fixed inset-0 flex items-center justify-center z-50 data-[open=false]:hidden`}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl z-10">
        <div className="flex justify-end">
          <button
            className="text-gray-100 hover:text-gray-200 focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
