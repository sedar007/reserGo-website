import React from "react";

export default function ConfirmationModal({ isOpen, closeModal, onConfirm, title, message}) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="mb-6 text-sm text-gray-600">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
}
