import { useEffect, useState } from "react";

import { Selector } from "./Selector";
import { Wheel } from "./Wheel";
import { Slider } from "./Slider";
import { Content } from "./Content";
import { Colours } from "./Colours";
import { Gist } from "./Gist";

import { cssString } from "../util";

// TODO add Buy Me a Coffee API

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
      <div id="controls" className="console-half">
        <div className="section">
          <h2>Design your gradient</h2>
          <Selector cssClass={cssClass} setCssClass={setCssClass} />
          <div id="wheels">
            <Wheel name={'gradient'} angle={gradient} setAngle={setGradient} />
            <Wheel name={'scroll'} angle={scroll} setAngle={setScroll} />
          </div>
          <Slider speed={speed} setSpeed={setSpeed} />
          <Colours coloursList={coloursList} setColoursList={setColoursList} square={square} setSquare={setSquare} />
        </div>
      </div>
      <div className="console-half">
        <div className="section">
          <h2>Copy and paste into CSS stylesheet</h2>
          <Content cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
        </div>
        <div className="section">
          <h2>Save and share</h2>
          <Gist cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
          <Gist cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
        </div>
        <div className="section">
          <span id="reset-span"><h2>Try a new gradient</h2><button onClick={resetConsole} >Reset</button></span>
        </div>
      </div>
    </main >
  )
}