import React, { useState } from "react";
import LoanModal from "./LoanModal";

function PersonList({ people, setPeople, onDeletePerson, showNotification }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialLoan, setInitialLoan] = useState(null);

  const handleAddLoan = (person) => {
    setSelectedPerson(person);
    setInitialLoan(null);
    setIsModalOpen(true);
  };

  const handleEditLoan = (person) => {
    setSelectedPerson(person);
    setInitialLoan(person.loan);
    // alert(`Editar préstamo para la persona: ${person.nombre}`);
    showNotification(
      "info",
      `Editar préstamo para la persona: ${person.nombre}`
    );
  };

  const handleDeleteLoan = (personId) => {
    alert(`Eliminar préstamo para la persona con ID: ${personId}`);
  };

  const handleSubmitLoan = (loanData) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === loanData.personId
          ? { ...person, loan: loanData } // Actualiza o agrega el préstamo
          : person
      )
    );
    showNotification(
      "success",
      initialLoan
        ? "Préstamo actualizado correctamente"
        : "Préstamo registrado correctamente."
    );
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Listado de Personas
      </h2>
      {people.length === 0 ? (
        <p className="text-gray-500">No hay personas registradas.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Apellido Paterno</th>
              <th className="py-2 px-4 border-b">Apellido Materno</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td className="py-2 px-4 border-b">{person.nombre}</td>
                <td className="py-2 px-4 border-b">{person.apellidoPaterno}</td>
                <td className="py-2 px-4 border-b">{person.apellidoMaterno}</td>
                <td className="py-2 px-4 border-b">{person.telefono}</td>
                <td className="py-2 px-4 border-b">{person.email}</td>
                <td className="py-2 px-4 border-b">
                  {/* Botón para agregar préstamo */}
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleAddLoan(person)}
                  >
                    Agregar Préstamo
                  </button>

                  {/* Botón para editar préstamo */}
                  <button
                    className={`px-2 py-1 rounded-md text-white ${
                      person.loan
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => person.loan && handleEditLoan(person)}
                    disabled={!person.loan}
                  >
                    Editar Préstamo
                  </button>

                  {/* Botón para eliminar persona */}
                  <button
                    onClick={() => onDeletePerson(person.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para registro de préstamo */}
      {isModalOpen && (
        <LoanModal
          person={selectedPerson}
          initialLoan={initialLoan}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitLoan}
        />
      )}
    </div>
  );
}

export default PersonList;
