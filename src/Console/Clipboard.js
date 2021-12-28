import { cssString } from "../util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

export function Clipboard({ speed, coloursList, gradient, scroll, cssClass }) {

  const [show, setShow] = useState(false);

  async function copyToClipboard() {
    const cssSelector = `.${cssClass}`
    console.log(cssClass);
    const style = cssString(speed, coloursList, gradient, scroll, cssSelector);
    setShow(true);
    setTimeout(() => setShow(false), 2000)
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(style);
    } else {
      return document.execCommand('copy', true, style);
    }
  }
  
  return (
    <div id="copy-div">
    <button id="copy-btn" className="btn-api" onClick={copyToClipboard}>
      <span className="icon"><FontAwesomeIcon icon="copy" /></span> Clipboard</button>
      {show && 
      <p id="small">Copied to clipboard!</p>
      }
    </div>
  )
}