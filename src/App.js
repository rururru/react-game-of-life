import { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import Toolbar from './Toolbar';

const cellSize = 20;
const operations = [
  [0, 1], [0, -1], [1, -1], [1, 0], [1, 1], [-1, -1], [-1, 0], [-1, 1]
];

function App() {

  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(200);

  const runningRef = useRef(running);
  runningRef.current = running;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const gridRef = useRef(null);

  useEffect(() => {
    const calculateAndSetGrid = () => {
      if (!gridRef.current) {
        return;
      }

      const newCols = Math.floor(gridRef.current.offsetWidth / cellSize);
      const newRows = Math.floor(gridRef.current.offsetHeight / cellSize);
      console.log(gridRef.current.offsetHeight)
      

      const rows = []
      for (let i = 0; i < newRows; i++) {
        rows.push(Array(newCols).fill(0));
      }
      setGrid(rows);
      setGeneration(0);
      setRunning(false);
    };

    calculateAndSetGrid();
    window.addEventListener('resize', calculateAndSetGrid);

    return () => window.removeEventListener('resize', calculateAndSetGrid);
  }, []);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      if (g.length === 0 || g[0].length === 0) return g;

      const numRows = g.length;
      const numCols = g[0].length;
      const newGrid = g.map((row) => [...row]);

      for (let i = 0; i < numRows; i++) {
        for (let k = 0; k < numCols; k++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
              neighbors += g[newI][newK];
            }
          });
          if (neighbors < 2 || neighbors > 3) {
            newGrid[i][k] = 0;
          } else if (g[i][k] === 0 & neighbors === 3){
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
    if (grid.length === 0 || grid[0].length === 0) return;
    const numRows = grid.length;
    const numCols = grid[0].length;
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
    }
    setGrid(rows);
    setGeneration(0);
  };

  const handleClear = () => {
    if (grid.length === 0 || grid[0].length === 0) return;
    const numRows = grid.length;
    const numCols = grid[0].length;
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array(numCols).fill(0));
    }
    setGrid(rows);
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
        ref={gridRef}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${cellSize}px)`
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
