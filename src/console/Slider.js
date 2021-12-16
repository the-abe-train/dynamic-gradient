export function Slider({ speed, setSpeed }) {
  return (
    <div>
      <label htmlFor="speed">Speed</label><br />
      <input type="range" name="speed" id="" min="1" max="59"
        value={speed} onChange={e => setSpeed(e.target.value)} />
    </div>
  )
}