import { useState } from 'react';
import './App.css';
import { Console } from './Console';
import { ColoursListContext } from './context';
import { calcScroll, listToString, radToDeg } from "./util";

function Header() {
  return (
    <div>
      <h1>CSS Dynamic Gradient Generator</h1>
      <div><span>by Abe Train</span></div>
    </div>
  )
}

function App() {

  // I don't fully get why the context provider needs a state passed to it???
  const [coloursList, setColoursList] = useState(['#7F95D1', '#FF82A9', '#FFC0BE']);
  const value = { coloursList, setColoursList }

  // test vars
  const gradient = 60;
  const speed = 30;

  const preview = {
    background: `linear-gradient(${radToDeg(gradient)}deg, ${listToString(coloursList)})`,
    backgroundSize: "400% 400%",
    animation: `GradientAnimation ${60 - speed}s ease infinite`
  }

  return (
    <ColoursListContext.Provider value={value}>
      <div className="App" style={preview}>
        <Header />
        <Console />
      </div>
    </ColoursListContext.Provider>
  );
}

export default App;
