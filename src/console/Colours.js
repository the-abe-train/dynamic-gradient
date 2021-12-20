import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";

// TODO Make the picker useable with only keyboard?

const Picker = ({ colour, setColour }) => {

  return (
    <div >
      <HexColorPicker color={colour} onChange={setColour} />
    </div>
  )
};

function ColourSquare({ squareColour, setColour, squareNumber,
  isActive, setSquare, activeColour }) {

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
      setSquare(squareNumber);
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
        <div  id="pallet">
          <Picker show={show} setShow={setShow} colour={activeColour}
            setColour={setColour} />
            <button onClick={() => setShow(false)}>Select</button>
        </div>
      }
    </div>
  )
}


export function Colours({ coloursList, setColoursList }) {

  const [colour, setColour] = useState("#7F95D1");
  const [square, setSquare] = useState(null);

  function addColour() {
    setColoursList([...coloursList, colour]);
    setSquare(coloursList.length);
  }

  function removeColour() {
    if (square) {
      const newList = [...coloursList];
      newList.splice(square, 1);
      setColoursList(newList);
      setSquare(null);
    }
  }

  // Change colour using useEffect
  // On the effect of Colour change, find the Colour in the Colours List
  // and set the Colours list to a new list with that colour changed
  useEffect(() => {
    const newList = [...coloursList];
    newList.splice(square, 1, colour);
    setColoursList(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colour])


  return (
    <div className="colours">
      <h2>Colours</h2>
      <button onClick={addColour}>Add</button>
      <button onClick={removeColour}>Real Remove</button>
      <ul className="colours-list">
        {coloursList.map((squareColour, index) => {
          const isActive = index === square;
          return <ColourSquare key={index} setColour={setColour} squareNumber={index}
          setSquare={setSquare} activeColour={colour} squareColour={squareColour} isActive={isActive} />
        })}
      </ul>
      {(coloursList.length < 3) && 
      <p>Please have at least 2 colours.</p>
      }
    </div>
  )
}

