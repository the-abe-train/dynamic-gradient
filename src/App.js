import './App.css';
import { Console } from './Console/index';

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
      <a className="socials-link" alt="@theAbeTrain twitter profile" href="https://twitter.com/theAbeTrain"><FontAwesomeIcon icon={["fab", "twitter"]} /></a>
      <a className="socials-link" alt="@the-abe-train github profile" href="https://github.com/the-abe-train"><FontAwesomeIcon icon={["fab", "github"]} /></a>
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
