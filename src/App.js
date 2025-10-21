import { useState, useCallback, useRef } from 'react';
import './App.css';
import Toolbar from './Toolbar';

const numRows = 30;
const numCols = 50;

const operations = [
  [0, 1], [0, -1], [1, -1], [1, 0], [1, 1], [-1, -1], [-1, 0], [-1, 1]
]

// Create Empty Grid
const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array(numCols).fill(0));
  }
  return rows;
}

function App() {

  const [grid, setGrid] = useState(() => createEmptyGrid());
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(200);

  const runningRef = useRef(running);
  runningRef.current = running;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      const newGrid = g.map(row => [...row]);
      for (let i = 0; i < numRows; i++) {
        for (let k = 0; k < numCols; k++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (0 <= newI && newI < numRows && 0 <= newK && newK < numCols) {
              neighbors += g[newI][newK];
            }
          });
          if (neighbors < 2 || neighbors > 3) {
            newGrid[i][k] = 0;
          } else if (g[i][k] === 0 && neighbors === 3) {
            newGrid[i][k] = 1;
          }
        }
      }
      return newGrid;
    });

    setGeneration(gen => gen + 1);

    setTimeout(runSimulation, speedRef.current);
  }, [])

  const handlePlayPause = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleRandom = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
    }
    setGrid(rows);
    setGeneration(0);
  };

  const handleClear = () => {
    setGrid(createEmptyGrid());
    setRunning(false);
    setGeneration(0);
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className='App'>
      <Toolbar
        onPlayPause={handlePlayPause}
        running={running}
        onRandom={handleRandom}
        onClear={handleClear}
        generation={generation}
        speed={speed}
        onSpeedChange={handleSpeedChange}
      />
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) => 
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              className={grid[i][k] ? 'cell alive' : 'cell dead'}
              onClick={() => {
                if (!running) {
                  const newGrid = grid.map(row => [...row]);
                  newGrid[i][k] = grid[i][k] ? 0 : 1;
                  setGrid(newGrid);
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
