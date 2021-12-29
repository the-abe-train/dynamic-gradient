import { useEffect, useRef } from "react";

export function Wheel({ name, angle, setAngle }) {

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

      // console.log(e);

      // Stop scrolling when dragging on mobile
      e.preventDefault();
      e.stopPropagation();

      // const client = checkInput() === "mouse" ? e : e.touches[0];
      const client = e.touches ? e.touches[0] : e;
      const point = { mx: client.clientX, my: client.clientY };
      let { mx, my } = point;
      let { wx, wy } = wheel;

      // Calculate angle
      rotation = Math.atan2(my - wy, mx - wx);
      setAngle(rotation);
    }

    const deactivateDrag = (e) => {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("touchmove", drag);
    }

    document.addEventListener("mousemove", drag, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", deactivateDrag, { passive: false });
    document.addEventListener("touchend", deactivateDrag, { passive: false });
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

  useEffect(() => {
    wheelRef.current.addEventListener('touchstart', activateDrag, { passive: false });
  })

  return (
    <div tabIndex="0" id={`${name}-wheel-subsection`} className="subsection"
      onKeyDown={keyboardRotate}>
      <label htmlFor="wheel"><h3>{title}</h3></label>
      <img id={`${name}-wheel`} ref={wheelRef} className="wheel" src="images/dial.svg" alt=""
        onMouseDown={activateDrag} />
    </div>
  )
}