import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://localhost:7069/api/weatherforecast')
      .then(response => setData(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>
          count is {data.length}
        </button>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>Date:</strong> {item.date} |
              <strong> Temp (C):</strong> {item.temperatureC}°C |
              <strong> Temp (F):</strong> {item.temperatureF}°F |
              <strong> Summary:</strong> {item.summary}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
