import { useEffect, useState } from "react";
import PersonForm from './components/PersonForm';
import PersonList from "./components/PersonList";
import Notification from './components/Notification';
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:7069/api/person").then((response) => {
      setPeople(response.data)
    })
  }, [])
  

  // Función para mostrar notificaciones
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  // Función para agregar una persona al listado
  const addPerson = (newPerson) => {
    setPeople([...people, { ...newPerson, id: people.length + 1}]);
  }

  // Función para eliminar una persona del listado
  const deletePerson = (personId) => {
    setPeople(people.filter((person) => person.id !== personId));
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-3xl font-bold text-center mb-6">Créditos Doña Lola</h1>
    {notification && (
      <Notification 
        type={notification.type}
        message={notification.message}
      />
    )}
    <PersonForm 
      onAddPerson={addPerson}
      showNotification={showNotification}
    />
    <PersonList 
      people={people} 
      setPeople={setPeople}
      onDeletePerson={deletePerson} 
      showNotification={showNotification}
    />
  </div>
  );
}

export default App;
