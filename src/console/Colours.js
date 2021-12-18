import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";


const Picker = ({ show, setShow, colour, setColour, coloursList, setColoursList }) => {


  function selectColour() {
    setColoursList([...coloursList, colour]);
    setShow(!show);
  }

  return (
    <div id="pallet" >
      <HexColorPicker color={colour} onChange={setColour} />
      <button onClick={selectColour}>Select</button>
    </div>
  )
};


export function Colours({ coloursList, setColoursList }) {
  const [show, setShow] = useState(false);
  const [colour, setColour] = useState("#aabbcc");

  function blur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShow(!show);
    }
  }

  function rgbToHex(rgb) {
    const rgbArr = rgb.match(/\d+/g);
    const hexArr = rgbArr.map(hue => parseInt(hue).toString(16));
    const hex = '#' + hexArr.join('');
    return hex
  }

  function replace(e) {
    setShow(!show);
    const rgb = e.target.style['background-color'];
    const hex = rgbToHex(rgb);
    
  }

  return (
    <div className="colours" onBlur={blur}>
      <h2>Colours</h2>
      <button onClick={() => setShow(!show)}>Add</button>
      <ul className="colours-list">
        {coloursList.map((colour, index) => {
          return <li key={index} onClick={replace} className="colour-square" style={{ backgroundColor: colour }}></li>
        })}
        {show &&
          <li className="colour-square" style={{ backgroundColor: colour }}></li>
        }
      </ul>
      {show &&
        <Picker show={show} setShow={setShow} colour={colour} setColour={setColour} coloursList={coloursList} setColoursList={setColoursList} />
      }
    </div>
  )
}

