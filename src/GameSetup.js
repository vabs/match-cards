import React, { useState } from 'react';
import './App.css';

import { useNavigate } from 'react-router-dom';

function GameSetup() {
  const navigate = useNavigate();
  const [gridSize, setGridSize] = useState('2');
  const [invalidGridSize, setInvalidGridSize] = useState(false);

  function onSizeSelect(e) {
    setGridSize(e.currentTarget.value);
  }

  function onPlayClick() {
    console.log('are we here??');
    if (gridSize === '') {
      console.log(document.getElementById('custom'));
      console.log(document.getElementById('custom').value);
    } else {
      navigate(`/game?size=${gridSize}`);
    }
  }

  function onGridSizeSelect(e) {
    const currentValue = e.currentTarget.value;
    if (currentValue % 2 === 0) {
      setInvalidGridSize(false);
    } else {
      setInvalidGridSize(true);
    }
  }

  return (
    <div className="App">
      <div className="gameTitle">
        <span className="gameTitle__letter">M</span>
        <span className="gameTitle__letter gameTitle__letterRotate">A</span>
        <span className="gameTitle__letter">T</span>
        <span className="gameTitle__letter gameTitle__letterRotate">C</span>
        <span className="gameTitle__letter">H</span>
        <span className="gameTitle__letter"> - </span>
        <span className="gameTitle__letter gameTitle__letterRotate">C</span>
        <span className="gameTitle__letter gameTitle__letterRotate">A</span>
        <span className="gameTitle__letter">R</span>
        <span className="gameTitle__letter">D</span>
        <span className="gameTitle__letter">S</span>
      </div>
      <fieldset>
        <legend>Choose Grid Size:</legend>
        <div className="grid-option">
          <input
            type="radio"
            id="2x2"
            name="size"
            value="2"
            checked={gridSize === '2'}
            onChange={(e) => onSizeSelect(e)}
          />
          <label htmlFor="2x2">2x2</label>
        </div>
        <div className="grid-option">
          <input
            type="radio"
            id="4x4"
            name="size"
            value="4"
            checked={gridSize === '4'}
            onChange={(e) => onSizeSelect(e)}
          />
          <label htmlFor="4x4">4x4</label>
        </div>
        <div className="grid-option">
          <input
            type="radio"
            id="6x6"
            name="size"
            value="6"
            checked={gridSize === '6'}
            onChange={(e) => onSizeSelect(e)}
          />
          <label htmlFor="6x6">6x6</label>
        </div>
        <div className="grid-option">
          <input
            type="radio"
            id="custom"
            name="size"
            value=""
            checked={gridSize === ''}
            onChange={(e) => onSizeSelect(e)}
          />
          <label htmlFor="custom">custom</label>
          <input
            type="number"
            id="custom"
            onChange={(e) => onGridSizeSelect(e)}
          />
          <span className={`error ${invalidGridSize ? 'visible' : ''}`}>
            Grid can be only even numbers!
          </span>
        </div>
        <button onClick={onPlayClick}>Play</button>
      </fieldset>
    </div>
  );
}

export default GameSetup;
