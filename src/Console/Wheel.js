import { useEffect, useRef } from "react";

// TODO fix dial turning on mobile with mouse.

export function Wheel({ name, angle, setAngle }) {

  function checkInput() {
    // const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    // if (regex.test(navigator.userAgent)) {
    if (navigator.userAgentData.mobile) {
      return "touch"
    } else {
      return "mouse";
    }
  }

  const wheelRef = useRef();

  const title = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()

  let rotation;

  function activateDrag(e) {

    // Stop scrolling when dragging on mobile
    e.preventDefault();
    e.stopPropagation();

    const wheelElement = wheelRef.current;
    const wheelRect = wheelElement.getBoundingClientRect();
    const wheel = {
      wx: wheelRect.left + (wheelRect.width / 2),
      wy: wheelRect.top + (wheelRect.height / 2)
    }

    const drag = (e) => {

      // Stop scrolling when dragging on mobile
      e.preventDefault();
      e.stopPropagation();

      const client = checkInput() === "mouse" ? e : e.touches[0];
      const point = { mx: client.clientX, my: client.clientY };
      let { mx, my } = point;
      let { wx, wy } = wheel;

      // Calculate angle
      rotation = Math.atan2(my - wy, mx - wx);
      setAngle(rotation);
    }

    const deactivateDrag = (e) => {
      document.removeEventListener(`mousemove`, drag);
      document.removeEventListener(`touchmove`, drag);
    }

    document.addEventListener(`mousemove`, drag, { passive: false });
    document.addEventListener(`touchmove`, drag, { passive: false });
    document.addEventListener(`mouseup`, deactivateDrag, { passive: false });
    document.addEventListener(`touchend`, deactivateDrag, { passive: false });
  }

  function keyboardRotate(e) {
    const clockwiseKeys = ["ArrowRight", "ArrowDown"];
    const widdershinsKeys = ["ArrowLeft", "ArrowUp"];
    if (clockwiseKeys.includes(e.key)) {
      e.preventDefault();
      setAngle(angle + 0.1);
    } else if (widdershinsKeys.includes(e.key)) {
      e.preventDefault();
      setAngle(angle - 0.1);
    }
  }

  useEffect(() => {
    const wheelElement = wheelRef.current;
    wheelElement.style.transform = `rotate(${angle}rad)`;
  }, [angle])


  return (
    <div onKeyDown={keyboardRotate} tabIndex="0" onMouseDown={activateDrag} onTouchStart={activateDrag} id={`${name}-wheel-subsection`} className="subsection">
      <label htmlFor="wheel"><h3>{title}</h3></label>
      <img id={`${name}-wheel`} ref={wheelRef} className="wheel" src="images/dial.svg" alt="" />
    </div>
  )
}