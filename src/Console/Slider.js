export function Slider({ speed, setSpeed }) {
  return (
    <div className="subsection">
      <label htmlFor="speed-input"><h3>Speed</h3></label>
      <input type="range" name="speed" id="speed-input" min="1" max="59"
        value={speed} onChange={e => setSpeed(e.target.value)} />
    </div>
  )
}