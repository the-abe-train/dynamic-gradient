import { Wheel } from "./Wheel";

export function Console() {
  return (
    <main>
      <div id="controls" className="content">
        <input type="text" />
        <div id="wheels">
          <Wheel name={'gradient'} />
          <Wheel name={'scroll'} />
        </div>
      </div>
      <div id="output" className="content"></div>
    </main>
  )
}