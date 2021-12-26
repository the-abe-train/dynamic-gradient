export function listToString(list) {
  const editList = [...list];
  const first = editList.shift();
  return editList.reduce((str, next) => {
    return `${str}, ${next}`;
  }, first);
}

export function radToDeg(rad) {
  let deg = rad * 180 / Math.PI + 90;
  deg = deg % 360;
  return deg.toFixed(0);
}

export function calcScroll(rad) {
  // I would love to try to explain this math and logic here but it really 
  // only makes sense in my notebook.
  const value = Math.round((0.5 * Math.sin(2 * rad - Math.PI) + 0.5) * 100);
  const condition = -Math.cos(2 * rad) >= 0;
  const xScroll = condition ? value : 0;
  const yScroll = condition ? 0 : value;
  return {
    x1: xScroll,
    y1: yScroll,
    x2: 100 - xScroll,
    y2: 100 - yScroll,
    x3: xScroll,
    y3: yScroll
  }
}

export function cssString(speed, coloursList, gradient, scroll, selector) {
  const { x1, y1, x2, y2, x3, y3 } = calcScroll(scroll);
  return `${selector} {
    background: linear-gradient(${radToDeg(gradient)}deg, ${listToString(coloursList)});
    background-size: 400% 400%;
    animation: GradientAnimation ${60 - speed}s ease infinite;
}
  
@keyframes GradientAnimation {
    0%{background-position:  ${x1}% ${y1}%}
    50%{background-position: ${x2}% ${y2}%}
    100%{background-position:${x3}% ${y3}%}
}`
}