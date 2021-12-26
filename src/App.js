import './App.css';
import { Console } from './Console';

function Header() {
  return (
    <h1>Dynamic Gradient Generator</h1>
  )
}

function Footer() {
  return (
    <span id="footer">by Abe Train</span>
  )
}

function App() {

  return (
    <div className="App" >
      <Header />
      <Console />
      <Footer />
    </div>
  );
}

export default App;
