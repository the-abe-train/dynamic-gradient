import { useState } from "react";

import { Wheel } from "./Wheel";
import { Slider } from "./Slider";
import { Content } from "./Content";
import { Colours } from "./Colours";

export function Console() {

  const [gradient, setGradient] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [coloursList, setColoursList] = useState([]);


  return (
    <main>
      <div id="controls" className="content">
        <input type="text" />
        <div id="wheels">
          <Wheel name={'gradient'} setAngle={setGradient} />
          <Wheel name={'scroll'} setAngle={setScroll} />
        </div>
        <Slider speed={speed} setSpeed={setSpeed} />
        <Colours coloursList={coloursList} setColoursList={setColoursList}/>
      </div>
      <div id="output" className="content">
        <Content gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
      </div>
    </main>
  )
}