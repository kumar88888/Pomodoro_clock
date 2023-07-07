import React, { useState, useEffect } from 'react';

const PomodoroClock = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(1);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(1500); // Reset to 25 minutes
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCycleChange = (event) => {
    const newCycles = parseInt(event.target.value, 10);
    setCycles(newCycles);
  };

  const totalMinutes = (25 + 5) * cycles;
  const totalTime = totalMinutes * 60;
  const remainingTime = formatTime(time);
  const limitReached = time === 0 && cycles > 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Pomodoro Clock</h1>
      <div className="mb-4">
        <label htmlFor="cycleInput" className="mr-2">
          Cycles:
        </label>
        <input
          id="cycleInput"
          type="number"
          min="1"
          max="10"
          value={cycles}
          onChange={handleCycleChange}
          className="border border-gray-400 rounded px-2 py-1"
        />
      </div>
      <div className="text-center">
        <p className="text-2xl mb-4">Time Remaining: {remainingTime}</p>
        {limitReached && <p className="text-red-500">Time limit reached!</p>}
        {!isRunning && time === totalTime && (
          <button
            onClick={startTimer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Stop
          </button>
        )}
        {!isRunning && time < totalTime && time > 0 && (
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Resume
          </button>
        )}
        {!isRunning && time < totalTime && time !== 0 && (
          <button
            onClick={resetTimer}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default PomodoroClock;