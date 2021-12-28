import { useEffect, useRef } from "react";

export function Wheel({ name, angle, setAngle }) {

  function checkInput() {
    const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (regex.test(navigator.userAgent)) {
      return "touch"
    } else {
      return "mouse";
    }
  }

  const wheelRef = useRef();

  const title = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()

  let rotation;

  function activateDrag(e) {

    const wheelElement = wheelRef.current;
    const wheelRect = wheelElement.getBoundingClientRect();
    const wheel = {
      wx: wheelRect.left + (wheelRect.width / 2),
      wy: wheelRect.top + (wheelRect.height / 2)
    }

    const drag = (e) => {
      e.preventDefault();
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

    document.addEventListener(`mousemove`, drag, false);
    document.addEventListener(`touchmove`, drag, { passive: false });
    document.addEventListener(`mouseup`, deactivateDrag, false);
    document.addEventListener(`touchend`, deactivateDrag, { passive: false });
  }

  useEffect(() => {
    const wheelElement = wheelRef.current;
    wheelElement.style.transform = `rotate(${angle}rad)`;
  }, [angle])


  return (
    <div onMouseDown={activateDrag} onTouchStart={activateDrag} id="wheel-section" className="subsection">
      <label htmlFor="wheel"><h3>{title}</h3></label>
      <img id={`${name}-wheel`} ref={wheelRef} className="wheel" src="images/dial.svg" alt="" />
    </div>
  )
}