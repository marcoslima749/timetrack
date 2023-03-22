import { useState, useEffect } from "react";
import "./App.css";



function App() {


  const [timers, setTimers] = useState([
    { id: 1, time: new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false },
    { id: 2, time: new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false },
    { id: 3, time: new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false },
  ]);

  const [timerNames, setTimerNames] = useState([
    "Timer 1",
    "Timer 2",
    "Timer 3",
  ]);

  const handleNameChange = (timerId, newName) => {
    setTimerNames((prevTimerNames) =>
      prevTimerNames.map((name, index) =>
        index === timerId - 1 ? newName : name
      )
    );
  };

  const startTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId
          ? { ...timer, isActive: true }
          : { ...timer, isActive: false }
      )
    );
  };

  const stopTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, isActive: false } : timer
      )
    );
  };

  const clearTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === timerId ? { ...timer, time : new Date(2023, 0, 1, 0, 0, 0, 0), isActive: false } : timer
      )
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.isActive
            ? {
                ...timer,
                time: new Date(
                  2023,
                  0,
                  0,
                  timer.time.getHours(),
                  timer.time.getMinutes(),
                  timer.time.getSeconds(),
                  timer.time.getMilliseconds() + 10
                ),
              }
            : { ...timer, isActive: false }
        )
      );
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      {timers.map((timer,index) => (
        <div key={timer.id} className="timerContainer">
          <h2>
            <input
              className="inputName"
              type="text"
              value={timerNames[index]}
              onChange={(event) =>
                handleNameChange(timer.id, event.target.value)
              }
            />
          </h2>
          <div>
            Time:{" "}
            {`${timer.time.toTimeString().substring(0, 8)},${timer.time
              .getMilliseconds()
              .toString()
              .substring(0, 2)}`}
          </div>
          <button className="button" onClick={() => startTimer(timer.id)}>Start</button>
          <button className="button" onClick={() => stopTimer(timer.id)}>Stop</button>
          <button className="button" onClick={() => clearTimer(timer.id)}>Clear</button>
        </div>
      ))}
    </div>
  );
}

export default App;
