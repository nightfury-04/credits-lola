import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import DebtorTable from "./components/DebtorTable";
import Notification from "./components/Notification";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7069/api/person").then((response) => {
      setPeople(response.data);
    });
  }, []);

  // Función para mostrar notificaciones
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Función para agregar una persona al listado
  const addPerson = (newPerson) => {
    setPeople([...people, { ...newPerson }]);
  }

  // Función para eliminar una persona del listado
  const deletePerson = (personId) => {
    setPeople(people.filter((person) => person.id !== personId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Créditos Doña Lola
        </h1>
        <nav className="bg-white p-4 shadow-md mb-6">
          <Link to="/" className="mr-4 text-blue-500 hover:underline">
            Inicio
          </Link>
          <Link
            to="/person-list"
            className="mr-4 text-blue-500 hover:underline"
          >
            Lista de personas
          </Link>
          <Link
            to="/debtor-table"
            className="mr-4 text-blue-500 hover:underline"
          >
            Lista de deudores
          </Link>
        </nav>

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <PersonForm
                onAddPerson={addPerson}
                showNotification={showNotification}
              />
            }
          />
          <Route
            path="/person-list"
            element={
              <PersonList
                people={people}
                setPeople={setPeople}
                onDeletePerson={deletePerson}
                showNotification={showNotification}
              />
            }
          />
          <Route path="/debtor-list" element={<DebtorTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
