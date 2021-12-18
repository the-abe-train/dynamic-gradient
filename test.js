// const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
//   console.log(x);
//   const hex = x.toString(16)
//   return hex.length === 1 ? '0' + hex : hex
// }).join('')

function rgbToHex(rgb) {
  const rgbArr = rgb.match(/\d+/g);
  const hexArr = rgbArr.map(hue => parseInt(hue).toString(16));
  const hex = '#' + hexArr.join('');
  return hex
}
const rgb = 'rgb(97, 132, 152)'
console.log(rgbToHex(rgb));