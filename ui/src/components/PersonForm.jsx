import axios from "axios";
import { useState } from "react";

function PersonForm({ onAddPerson, showNotification }) {
  const [formData, setFormData] = useState({
    ci: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("https://localhost:7069/api/person", formData).then(() => {
      onAddPerson(formData);
      setFormData({ ci: "", nombre: "", apellidoPaterno: "", apellidoMaterno: "", telefono: "", email: "" })
      showNotification("success", "Persona registrada correctamente.");
    }).catch((error) => {
      console.error("Error:", error);
      showNotification("error", "No se pudo registrar a la persona.");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Registro de Persona
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ci"
              className="block text-sm font-medium text-gray-700"
            >
              CI
            </label>
            <input
              type="text"
              id="ci"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apellidoPaterno"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido Paterno
            </label>
            <input
              type="text"
              id="apellidoPaterno"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="apellidoMaterno"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido Materno
            </label>
            <input
              type="text"
              id="apellidoMaterno"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Agregar Persona
        </button>
      </form>
    </div>
  );
}

export default PersonForm;
