
function listToString(list) {
  const editList = [...list];
  const first = editList.shift();
  return editList.reduce((str, next) => {
    return `${str}, ${next}`;
  }, first);
}

function radToDeg(rad) {
  let deg = rad * 180 / Math.PI + 270;
  deg = deg % 360;
  return deg.toFixed(0);
}

function calcScroll(rad) {
  // I would love to try to explain this math and logic here but it really 
  // only makes sense in my notebook.
  const trigFunc = Math.round((0.5 * Math.sin(2 * rad - Math.PI) + 0.5) * 100);
  const condition = ~~((rad + Math.PI / 4) / (Math.PI / 2)) % 2 === 1;
  const xScroll = condition ? trigFunc : 0;
  const yScroll = condition ? 0 : trigFunc;
  return {
    x1: xScroll,
    y1: yScroll,
    x2: 100 - xScroll,
    y2: 100 - yScroll,
    x3: xScroll,
    y3: yScroll
  }
}


export function Content({ gradient, scroll, speed, coloursList }) {

  const { x1, y1, x2, y2, x3, y3 } = calcScroll(scroll);

  return (
    <div id="output-area">
      <span >.css-selector &#123; </span> <br />
      <span className="indent">background: linear-gradient({radToDeg(gradient)}deg, {listToString(coloursList)});</span> <br />
      <span className="indent">background-size: 400% 400%;</span> <br />
      <span className="indent">animation: GradientAnimation {speed}s ease infinite;</span> <br />
      <span>&#125;</span> <br />
      <br />
      <span>@keyframes GradientAnimation &#123;</span> <br />
      <span className="indent">0%&#123;background - position:{x1}% {y1}%&#125;</span> <br />
      <span className="indent">50%&#123;background - position:{x2}% {y2}%&#125;</span> <br />
      <span className="indent">100&#123;background - position:{x3}% {y3}%&#125;</span> <br />
      <span>&#125;</span>
    </div>
  )
}