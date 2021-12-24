import { useEffect, useState } from "react"

export function Selector({ cssClass, setCssClass }) {

  const [error, setError] = useState("");

  useEffect(() => {
    if (cssClass.includes(' ')) {
      setError("Must not include whitespace");
    } else {
      setError("");
    }
  }, [cssClass])

  return (
    <div>
      <label htmlFor="selector"><h3>CSS Class</h3></label>
      <input
        spellCheck="false"
        className="selector"
        name="selector"
        value={cssClass}
        type="text"
        onChange={e => setCssClass(e.target.value.toLowerCase())} />
      <p className="error-text">{error}</p>
    </div>
  )
}