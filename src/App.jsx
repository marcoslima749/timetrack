import { useState, useEffect } from "react";
import "./App.css";


// Este archivo contiene un componente React que muestra varios cronómetros
// y permite a los usuarios iniciar, detener y restablecer cada cronómetro.
// Está pensado para hacer time tracking, por lo que al iniciar un cronómetro,
// los demás se detienen.
// Los usuarios también pueden cambiar el nombre de cada cronómetro.



function App() {

  // Estado que almacena la información de cada cronómetro: su ID, tiempo y si está activo.
  const [chron, setChron] = useState([
    { id: 1, time: new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false },
    { id: 2, time: new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false },
    { id: 3, time: new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false },
  ]);

  // Estado que almacena el nombre de cada cronómetro.
  const [crhonNames, setChronNames] = useState([
    "Timer 1",
    "Timer 2",
    "Timer 3",
  ]);

  // Maneja el cambio de nombre de un cronómetro.
  const handleNameChange = (chronId, newName) => {
    setChronNames((prevChronNames) =>
      prevChronNames.map((name, index) =>
        index === chronId - 1 ? newName : name
      )
    );
  };

  // Inicia un cronómetro con el ID dado y detiene todos los demás cronómetros.
  const startChron = (chronId) => {
    setChron((chronTimers) =>
      chronTimers.map((chron) =>
        chron.id === chronId
          ? { ...chron, isActive: true }
          : { ...chron, isActive: false }
      )
    );
  };

  // Detiene un cronómetro con el ID dado.
  const stopChron = (chronId) => {
    setChron((prevChrons) =>
      prevChrons.map((chron) =>
        chron.id === chronId ? { ...chron, isActive: false } : chron
      )
    );
  };

  // Restablece un cronómetro con el ID dado a su estado original.
  const clearChron = (chronId) => {
    setChron((prevChrons) =>
      prevChrons.map((chron) =>
        chron.id === chronId ? { ...chron, time : new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false } : chron
      )
    );
  };

  // Actualiza el estado del cronómetro para reflejar el tiempo transcurrido.
  useEffect(() => {
    // El temporizador se actualiza cada 10 milisegundos.
    const intervalId = setInterval(() => {
      setChron((prevChrons) =>
        prevChrons.map((chron) =>
          chron.isActive
            ? {
                ...chron,
                time: new Date(
                  2023,
                  0,
                  0,
                  chron.time.getHours(),
                  chron.time.getMinutes(),
                  chron.time.getSeconds(),
                  chron.time.getMilliseconds() + 10
                ),
              }
            : { ...chron, isActive: false }
        )
      );
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto">
      {chron.map((chron,index) => (
        <div key={chron.id} className="timerContainer align-middle flex flex-col">
          <h2>
            <input
              className="inputName text-2xl text-center align-middle"
              type="text"
              value={crhonNames[index]}
              onChange={(event) =>
                handleNameChange(chron.id, event.target.value)
              }
            />
          </h2>
          <div className="text-2xl text-center align-middle">
            Time: 
            {` ${chron.time.toTimeString().substring(0, 8)},${chron.time
              .getMilliseconds()
              .toString()
              .substring(0, 2)}`}
          </div>
          <button className="bg-blue-400 hover:bg-blue-600" onClick={() => startChron(chron.id)}>Start</button>
          <button className="button" onClick={() => stopChron(chron.id)}>Stop</button>
          <button className="button" onClick={() => clearChron(chron.id)}>Clear</button>
        </div>
      ))}
    </div>
  );
}

export default App;
