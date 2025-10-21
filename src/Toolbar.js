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
          {running ? '▐▐' : '▶'}
        </button>
        <button onClick={onRandom}>Random</button>
        <button onClick={onClear}>Clear</button>
      </div>
      <div className="toolbar-info">
        <span>Generation: {generation}</span>
        <label>
          Speed:
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