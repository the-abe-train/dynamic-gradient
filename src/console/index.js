import { useEffect, useState } from "react";

import { Wheel } from "./Wheel";
import { Slider } from "./Slider";
import { Content } from "./Content";
import { Colours } from "./Colours";

import { calcScroll, listToString, radToDeg } from "../util";

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

  function resetConsole() {
    setGradient(defaultGradient);
    setScroll(defaultScroll);
    setSpeed(defaultSpeed);
    setColoursList(defaultColoursList);
    setSquare(null);
  }

  useEffect(() => {
    const { x1, y1, x2, y2, x3, y3 } = calcScroll(scroll);
    setPreview(
      `html {
          background: linear-gradient(${radToDeg(gradient)}deg, ${listToString(coloursList)});
          background-size: 400% 400%;
          animation: GradientAnimation ${60-speed}s ease infinite;
        }
        
        @keyframes GradientAnimation {
          0%{background-position:  ${x1}% ${y1}%}
          50%{background-position: ${x2}% ${y2}%}
          100%{background-position:${x3}% ${y3}%}
        }`
    )
  }, [speed, coloursList, gradient, scroll])

  return (
    <main >
      <style> {preview} </style>
      <div id="controls" className="content">
        <input type="text" />
        <div id="wheels">
          <Wheel name={'gradient'} angle={gradient} setAngle={setGradient} />
          <Wheel name={'scroll'} angle={scroll} setAngle={setScroll} />
        </div>
        <Slider speed={speed} setSpeed={setSpeed} />
        <Colours coloursList={coloursList} setColoursList={setColoursList} square={square} setSquare={setSquare} />
        <button onClick={resetConsole} >Reset</button>
      </div>
      <div id="output" className="content">
        <Content gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
      </div>
    </main >
  )
}