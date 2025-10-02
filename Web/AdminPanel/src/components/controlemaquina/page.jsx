import React, { useState, useEffect, useRef } from 'react';
import './ControleMaquina.css';

export default function PressControl() {
  const [timer, setTimer] = useState(0);
  const [quantity, setQuantity] = useState(25);
  const [produced, setProduced] = useState(0);
  const [failed] = useState(0);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);

  const secondsCounter = useRef(0);

  useEffect(() => {
    let interval;
    if (!paused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        secondsCounter.current += 1;

        const newProgress = (secondsCounter.current / 60) * 100;
        setProgress(newProgress);

        if (secondsCounter.current >= 60) {
          setProduced(prev => prev + quantity);
          secondsCounter.current = 0;
          setProgress(0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paused, quantity]);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleConfirm = () => {
    setProduced(prev => prev + quantity);
    secondsCounter.current = 0;
    setProgress(0);
  };

  return (
    <div className="container">
      <h1 className="title">PRENSA 22T</h1>

      <div className="timerSection">
        <span className="timer">{formatTime(timer)}</span>
        <button className="pauseBtn" onClick={() => setPaused(!paused)}>
          {paused ? '▶️ START' : '⏸️ STOP'}
        </button>
      </div>

      <div className="progressBar">
        <div className="progressFill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="productInfo">
        <h2>GARRA ESCADA MOD. S3000</h2>

        <div className="tabs">
          <button className="tab active">Produção</button>
          <button className="tab">Sobras</button>
        </div>

        <div className="quantityControl">
          <button className="quantityBtn" onClick={() => setQuantity(q => Math.max(0, q - 1))}>−</button>
          <input type="number" value={quantity} readOnly />
          <button className="quantityBtn" onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <button className="confirmBtn" onClick={handleConfirm}>CONFIRMAR</button>

        <div className="status">
          <p>Produzido: <strong>{produced}</strong></p>
          <p>Falham: <strong>{failed}</strong></p>
        </div>
      </div>
    </div>
  );
}
