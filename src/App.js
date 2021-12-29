import './App.css';
import { Console } from './Console';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab, faCopy, faCheckSquare, faCoffee);

function Header() {
  return (
    <h1>Dynamic Gradient Generator</h1>
  )
}

function Footer() {
  return (
    <span id="footer" className="icon">
      <a className="socials-link" href="https://the-abe-train.com">by The Abe Train</a>
      <a className="socials-link" alt="@theAbeTrain twitter profile" href="https://twitter.com/theAbeTrain" > <span className="visually-hidden">Twitter</span><FontAwesomeIcon alt="twitter" name="twitter link" icon={["fab", "twitter"]} /></a>
      <a className="socials-link" alt="@the-abe-train github profile" href="https://github.com/the-abe-train"><span className="visually-hidden">Github</span><FontAwesomeIcon alt="github" name="github link" icon={["fab", "github"]} /></a>
    </span>
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
