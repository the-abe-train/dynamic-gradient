import { useContext } from "react";
import { ColoursListContext } from "../context";
import { calcScroll, listToString, radToDeg } from "../util";

export function Content({ gradient, scroll, speed }) {

  const { x1, y1, x2, y2, x3, y3 } = calcScroll(scroll);
  const { coloursList } = useContext(ColoursListContext);

  return (
    <div id="output-area">
      <span >.css-selector &#123; </span> <br />
      <span className="indent">background: linear-gradient({radToDeg(gradient)}deg, {listToString(coloursList)});</span> <br />
      <span className="indent">background-size: 400% 400%;</span> <br />
      <span className="indent">animation: GradientAnimation {60 - speed}s ease infinite;</span> <br />
      <span>&#125;</span> <br />
      <br />
      <span>@keyframes GradientAnimation &#123;</span> <br />
      <span className="indent">0%&#123;background-position:{x1}% {y1}%&#125;</span> <br />
      <span className="indent">50%&#123;background-position:{x2}% {y2}%&#125;</span> <br />
      <span className="indent">100%&#123;background-position:{x3}% {y3}%&#125;</span> <br />
      <span>&#125;</span>

    </div>
  )
}