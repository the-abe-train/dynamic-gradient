import { useEffect, useState } from "react";

import { Selector } from "./Input";
import { Wheel } from "./Wheel";
import { Slider } from "./Slider";
import { Content } from "./Content";
import { Colours } from "./Colours";
import { Gist } from "./Gist";

import { cssString } from "../util";

export function Console() {

  const defaultGradient = 0;
  const defaultScroll = 0;
  const defaultSpeed = 30;
  const defaultColoursList = ['#7F95D1', '#FF82A9', '#FFC0BE'];

  const [gradient, setGradient] = useState(defaultGradient);
  const [scroll, setScroll] = useState(defaultScroll);
  const [speed, setSpeed] = useState(defaultSpeed);
  const [coloursList, setColoursList] = useState(defaultColoursList);
  const [square, setSquare] = useState(null);
  const [preview, setPreview] = useState("");
  const [cssClass, setCssClass] = useState("css-selector");

  function resetConsole() {
    setGradient(defaultGradient);
    setScroll(defaultScroll);
    setSpeed(defaultSpeed);
    setColoursList(defaultColoursList);
    setSquare(null);
  }

  useEffect(() => {
    const style = cssString(speed, coloursList, gradient, scroll, "html");
    setPreview(style);
  }, [speed, coloursList, gradient, scroll])

  return (
    <main >
      <style> {preview} </style>
      <div id="controls" className="content">
        <Selector cssClass={cssClass} setCssClass={setCssClass} />
        <div id="wheels">
          <Wheel name={'gradient'} angle={gradient} setAngle={setGradient} />
          <Wheel name={'scroll'} angle={scroll} setAngle={setScroll} />
        </div>
        <Slider speed={speed} setSpeed={setSpeed} />
        <Colours coloursList={coloursList} setColoursList={setColoursList} square={square} setSquare={setSquare} />
        <button onClick={resetConsole} >Reset</button>
        <Gist cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
      </div>
      <div id="output" className="content">
        <Content cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
      </div>
    </main >
  )
}