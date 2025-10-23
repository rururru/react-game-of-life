import './Toolbar.css';

function Toolbar({
  onPlayPause,
  running,
  onRandom,
  onClear,
  generation,
  speed,
  onSpeedChange
}) {
  return (
    <div className="toolbar">
      <div className="buttons">
        <button onClick={onPlayPause}>
          {running ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
        </button>
        <button onClick={onRandom}><i className="bi bi-dice-5"></i></button>
        <button onClick={onClear}>Clear</button>
      </div>
      <div className="toolbar-info">
        <span>Generation: {generation}</span>
        <label>
          Duration:
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={onSpeedChange}
          />
        </label>
      </div>
    </div>
  )
}

export default Toolbar