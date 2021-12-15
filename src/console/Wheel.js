export function Wheel({ name }) {

  const title = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()

  function activateDrag(e) {
    const wheelElement = e.target.closest(".wheel");
    const wheelRect = wheelElement.getBoundingClientRect();
    const wheel = {
      wx: wheelRect.left + (wheelRect.width / 2),
      wy: wheelRect.top + (wheelRect.height / 2)
    }

    const drag = (e) => {
      const mouse = { mx: e.clientX, my: e.clientY }
      let { mx, my } = mouse;
      let { wx, wy } = wheel;
      let angle = Math.atan2(my - wy, mx - wx);
      wheelElement.style.transform = `rotate(${angle}rad)`;
    }

    const deactivateDrag = (e) => {
      document.removeEventListener("mousemove", drag);
    }

    document.addEventListener("mousemove", drag, false);
    document.addEventListener("mouseup", deactivateDrag, false);
  }


  return (
    <div onMouseDown={activateDrag} className="wheel-section">
      <label htmlFor="wheel">{title} Angle</label>
      <svg className="wheel" height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="transparent" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="black" strokeWidth="3" />
      </svg>
    </div>
  )
}