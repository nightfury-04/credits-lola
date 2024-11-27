import React, { useState } from "react";

function PaymentsModal({ person, onClose, onAddPayment }) {
  const [payment, setPayment] = useState("");

  const handleAddPayment = (e) => {
    e.preventDefault();
    onAddPayment({
      amount: payment,
      date: new Date().toISOString().split("T")[0], // Fecha actual
    });
    setPayment("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">Pagos para {person.nombre}</h3>
        <ul className="mb-4">
          {person.loan?.payments?.length ? (
            person.loan.payments.map((p, index) => (
              <li key={index} className="text-gray-700">
                {p.date} - ${p.amount}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay pagos registrados.</p>
          )}
        </ul>
        <form onSubmit={handleAddPayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto del Abono</label>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Registrar Abono
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentsModal;
