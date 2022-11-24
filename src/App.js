import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './App.css';

const App = () => {
  const navigate = useNavigate();

  const [serachParams] = useSearchParams();
  const [gridSize] = useState(serachParams.get('size') || '4');
  const [gameGrid, setGameGrid] = useState([[]]);

  const [openGameGrid, setOpenGameGrid] = useState([[]]);
  const [previousCardClicked, setPreviousCardClicked] = useState({});
  const [hasWon, setHasWon] = useState(false);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function handleCardClick(rowIndex, colIndex) {
    if (!openGameGrid[rowIndex][colIndex]) {
      if (previousCardClicked.rowIndex === undefined) {
        // first click
        setPreviousCardClicked({
          rowIndex,
          colIndex,
        });
        const newOpenGameGrid = [...openGameGrid];
        newOpenGameGrid[rowIndex][colIndex] = true;
        setOpenGameGrid(newOpenGameGrid);
      } else if (
        gameGrid[previousCardClicked.rowIndex][previousCardClicked.colIndex] ===
        gameGrid[rowIndex][colIndex]
      ) {
        // cards match
        const newOpenGameGrid = [...openGameGrid];
        newOpenGameGrid[rowIndex][colIndex] = true;
        setOpenGameGrid(newOpenGameGrid);
        setPreviousCardClicked({});
      } else {
        // cards do not match
        const newOpenGameGrid = [...openGameGrid];
        newOpenGameGrid[rowIndex][colIndex] = true;
        setOpenGameGrid(newOpenGameGrid);
        setTimeout(() => {
          newOpenGameGrid[rowIndex][colIndex] = false;
          newOpenGameGrid[previousCardClicked.rowIndex][
            previousCardClicked.colIndex
          ] = false;
          setOpenGameGrid(newOpenGameGrid);
          setPreviousCardClicked({});
        }, 350);
      }

      const allMatched = openGameGrid.flat().every((ele) => ele);
      if (allMatched) {
        setHasWon(true);
      }
    }
  }

  function handleReplayClick() {
    setHasWon(false);
    setPreviousCardClicked({});
    shuffleArray(gameGrid);
    setOpenGameGrid(
      new Array(gameGrid.length)
        .fill('')
        .map(() => new Array(gameGrid[0].length).fill(false)),
    );
  }

  function handleGoToHomeClick() {
    navigate('/');
  }

  useEffect(() => {
    let baseGrid = Array.from(
      { length: (gridSize * gridSize) / 2 },
      (_, idx) => `${++idx}`,
    );
    baseGrid = [...baseGrid, ...baseGrid];

    shuffleArray(baseGrid);

    let tempGrid = [];
    for (let index = 0; index < gridSize; index++) {
      tempGrid.push(baseGrid.splice(0, gridSize));
    }

    setGameGrid((p) => {
      p = tempGrid;
      return p;
    });

    setOpenGameGrid((p) => {
      let falseArray = new Array(gridSize).fill('');
      // console.log('grid size', gridSize, falseArray);
      for (let index = 0; index < gridSize; index++) {
        let tempGrid = new Array(gridSize).fill(false);
        // console.log('temp grid', tempGrid);
        falseArray[index] = [...tempGrid];
      }
      p = falseArray;
      // console.log('false array', falseArray);
      return p;
    });
  }, []);

  return (
    <div className="App">
      <div className="won">
        {hasWon && (
          <>
            <h1>You Won!</h1>
            <Confetti />
            <button onClick={handleReplayClick} className="button">
              Replay
            </button>
            <button onClick={handleGoToHomeClick} className="button">
              Go to Home
            </button>
          </>
        )}
      </div>
      {gameGrid === undefined && openGameGrid === undefined ? (
        <div>Loading ....</div>
      ) : (
        <>
          {gameGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((number, colIndex) => (
                <div
                  key={colIndex}
                  className={`card ${
                    openGameGrid[rowIndex][colIndex] ? 'revealed' : ''
                  }`}
                  onMouseDownCapture={() => handleCardClick(rowIndex, colIndex)}
                >
                  {openGameGrid[rowIndex][colIndex] ? number : ''}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
