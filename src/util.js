export function listToString(list) {
  const editList = [...list];
  const first = editList.shift();
  return editList.reduce((str, next) => {
    return `${str}, ${next}`;
  }, first);
}

export function radToDeg(rad) {
  let deg = rad * 180 / Math.PI + 270;
  deg = deg % 360;
  return deg.toFixed(0);
}

export function calcScroll(rad) {
  // I would love to try to explain this math and logic here but it really 
  // only makes sense in my notebook.
  const value = Math.round((0.5 * Math.sin(2 * rad - Math.PI) + 0.5) * 100);
  const condition = -Math.cos(2*rad) >= 0;
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