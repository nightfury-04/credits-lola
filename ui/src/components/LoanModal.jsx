import axios from "axios";
import { useState, useEffect } from "react";

function LoanModal({ person, onClose, onSubmit, initialLoan, showNotification }) {
  const [loanData, setLoanData] = useState({
    person,
    cantidadPrestada: "",
    fechaPrestamo: "",
    diaCobro: "",
    mesesDelPrestamo: "",
    intereses: "",
  });

  console.log(loanData.person);


  // Prellenar el formulario si estamos en modo edición
  useEffect(() => {
    if (initialLoan) {
      setLoanData(initialLoan);
    }
  }, [initialLoan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("https://localhost:7069/api/loan", loanData)
      .then((response) => {
        onSubmit(response.data);
        setLoanData({
          person,
          cantidadPrestada: "",
          fechaPrestamo: "",
          diaCobro: "",
          mesesDelPrestamo: "",
          intereses: "",
        })
        showNotification("success", "Prestamo creado correctamente.");
      }).catch((error) => {
        console.error("Error:", error);
        showNotification("error", "No se crear el prestamo.");
      }).finally(() => {
        onClose();
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit({ ...loanData, personId: person.id });
  //   onClose();
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">
          {initialLoan ? "Editar Préstamo" : "Agregar Préstamo"} para {person.nombre}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cantidad Prestada
            </label>
            <input
              type="number"
              name="cantidadPrestada"
              value={loanData.cantidadPrestada}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha del Préstamo
            </label>
            <input
              type="date"
              name="fechaPrestamo"
              value={loanData.fechaPrestamo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Día de Cobro
            </label>
            <input
              type="number"
              name="diaCobro"
              value={loanData.diaCobro}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meses del Préstamo
            </label>
            <input
              type="number"
              name="mesesDelPrestamo"
              value={loanData.mesesDelPrestamo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Intereses (%)
            </label>
            <input
              type="number"
              name="intereses"
              value={loanData.intereses}
              onChange={handleChange}
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
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoanModal;
