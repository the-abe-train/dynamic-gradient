import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Selector } from "./Selector";
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
  const defaultColoursList = ['#B0F2B4', '#BAF2E9', '#BAD7F2'];

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

  async function copyToClipboard() {
    const cssSelector = `.${cssClass}`
    const style = cssString(speed, coloursList, gradient, scroll, cssSelector);
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(style);
    } else {
      return document.execCommand('copy', true, style);
    }
  }

  return (
    <main >
      <style> {preview} </style>
      <div id="controls" className="console-half">

        <div className="section">
          <h2>Design your gradient</h2>
          <div id="controls-functions">
            <Selector cssClass={cssClass} setCssClass={setCssClass} />
            <div id="wheels">
              <Wheel name={'gradient'} angle={gradient} setAngle={setGradient} />
              <Wheel name={'scroll'} angle={scroll} setAngle={setScroll} />
            </div>
            <Slider speed={speed} setSpeed={setSpeed} />
            <Colours coloursList={coloursList} setColoursList={setColoursList} square={square} setSquare={setSquare} />
          </div>
        </div>
      </div>
      <div id="output-half" className="console-half">
        <div className="section">
          <h2>Copy and paste into CSS stylesheet</h2>
          <Content cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
        </div>
        <div className="section">
          <span id="reset-span">
            <h2>Try a new gradient</h2>
            <button id="reset-btn" className="btn-1" onClick={resetConsole} >Reset</button>
          </span>
        </div>
        <div className="section">
          <h2>Save and share</h2>
          <div id="api-btns">
            <button id="copy-btn" className="btn-api" onClick={copyToClipboard}><span className="icon"><FontAwesomeIcon icon="copy" /></span> Clipboard</button>
            <Gist cssClass={cssClass} gradient={gradient} scroll={scroll} speed={speed} coloursList={coloursList} />
            <a href="https://www.buymeacoffee.com/theabetrain" target="_blank" rel="noreferrer"><img className="btn-api" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" id="coffee-btn" style={{ height: '40px !important', width: '142px !important' }} /></a>
          </div>
        </div>
      </div>
    </main >
  )
}