import { useContext, useState } from "react";

import { Wheel } from "./Wheel";
import { Slider } from "./Slider";
import { Content } from "./Content";
import { Colours } from "./Colours";

import { ColoursListContext } from "../context";

// TODO Reset function should fix the active colour to default.

export function Console() {

  const defaultGradient = 0;
  const defaultScroll = 0;
  const defaultSpeed = 30;
  const defaultColoursList = ['#7F95D1', '#FF82A9', '#FFC0BE'];

  const [gradient, setGradient] = useState(defaultGradient);
  const [scroll, setScroll] = useState(defaultScroll);
  const [speed, setSpeed] = useState(defaultSpeed);

  const { setColoursList } = useContext(ColoursListContext);


  function resetConsole() {
    setGradient(defaultGradient);
    setScroll(defaultScroll);
    setSpeed(defaultSpeed);
    setColoursList(defaultColoursList);
  }

  return (
    <main>
      <div id="controls" className="content">
        <input type="text" />
        <div id="wheels">
          <Wheel name={'gradient'} angle={gradient} setAngle={setGradient} />
          <Wheel name={'scroll'} angle={scroll} setAngle={setScroll} />
        </div>
        <Slider speed={speed} setSpeed={setSpeed} />
        <Colours />
        <button onClick={resetConsole} >Reset</button>
      </div>
      <div id="output" className="content">
        <Content gradient={gradient} scroll={scroll} speed={speed} />
      </div>
    </main>
  )
}