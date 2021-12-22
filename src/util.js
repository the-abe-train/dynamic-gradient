// TODO scroll angle is wrong in the upper quadrant of the circle

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