import { useState } from 'react';
import './App.css';

const numRows = 30;
const numCols = 50;

// Create Empty Grid
const createEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array(numCols).fill(0));
  }
  return rows;
}

function App() {

  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(newGrid);
  }


  return (
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
            onClick={() => handleCellClick(i, k)}
          />
        ))
      )}
    </div>
  );
}

export default App;
