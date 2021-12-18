export function Content({gradient, scroll, speed, coloursList }) {
  return (
    <div>
      <p>Gradient: {gradient}</p>
      <p>Scroll: {scroll}</p>
      <p>Speed: {speed}</p>
      <ul>
        {coloursList.map((colour, index) => {
          return <li key={index} style={{color: colour}}>{colour}</li>
        })}
      </ul>
    </div>
  )
}