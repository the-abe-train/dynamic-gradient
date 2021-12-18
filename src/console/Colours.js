import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";


const Picker = ({ setShow, colour, setColour }) => {
  // TODO Make the picker useable with only keyboard

  function selectColour() {
    setShow(false);
  }

  return (
    <div id="pallet" >
      <HexColorPicker color={colour} onChange={setColour} />
      <button onClick={selectColour}>Select</button>
    </div>
  )
};

function ColourSquare({ squareColour, setColour, squareNumber,
  isActive, activate, activeColour }) {

  const [show, setShow] = useState(false);

  const style = {
    backgroundColor: isActive ? activeColour : squareColour,
    border: isActive ? '.2em solid' : ''
  }

  const activateSquare = () => {
    if (show) {
      setShow(false);
    } else {
      setColour(squareColour);
      activate(squareNumber);
      setShow(true);
    }
  }

  function blur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShow(false);
    }
  }

  useEffect(() => {
    if (!isActive) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [isActive])


  return (
    <div onBlur={blur}>
      <li className="colour-square" style={style} onClick={activateSquare}></li>
      {
        show &&
        <Picker show={show} setShow={setShow} colour={activeColour}
          setColour={setColour} />
      }
    </div>
  )
}


export function Colours({ coloursList, setColoursList }) {

  const [colour, setColour] = useState("#aabbcc");
  const [square, setSquare] = useState(null);


  function addColour() {
    setColoursList([...coloursList, colour]);
    setSquare(coloursList.length);
  }

  // Change colour using useEffect
  // On the effect of Colour change, find the Colour in the Colours List
  // and set the Colours list to a new list with that colour changed
  useEffect(() => {
    const newList = [...coloursList];
    newList.splice(square, 1, colour);
    console.log(newList);
    setColoursList(newList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colour])


  return (
    <div className="colours">
      <h2>Colours</h2>
      <button onClick={addColour}>Add</button>
      <ul className="colours-list">
        {coloursList.map((squareColour, index) => {
          const isActive = index === square;
          return <ColourSquare key={index} setColour={setColour} squareNumber={index} activate={setSquare} activeColour={colour} squareColour={squareColour} isActive={isActive} />
        })}
      </ul>
    </div>
  )
}

