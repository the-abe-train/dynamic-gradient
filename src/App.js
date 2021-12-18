import './App.css';
import { Console } from './Console';

function Header() {
  return (
    <div>
      <h1>CSS Dynamic Gradient Generator</h1>
      <div><span>by Abe Train</span></div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
      <Console />
    </div>
  );
}

export default App;
