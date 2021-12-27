import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cssString } from "../util";

export function Gist({ speed, coloursList, gradient, scroll, cssClass }) {

  const selector = `.${cssClass}`;
  let gistContent = cssString(speed, coloursList, gradient, scroll, selector);
  gistContent += "\n\n /* Created using dynamicgradients.com */"

  const postGistApi = `${process.env.REACT_APP_DOMAIN}/postgist`;
  const loginApi = `${process.env.REACT_APP_DOMAIN}/login`;

  function postGist() {
    const data = {
      description: "CSS Dynamic Gradient",
      public: true,
      files: {
        "dynamic_gradient.css": {
          content: gistContent,
        },
      },
    };
    fetch(postGistApi, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => window.location = loginApi)
      .catch((e) => console.error(e));
  }

  return (

    <button id="gist-btn" className="btn-api" onClick={postGist}>
      <span className="icon"><FontAwesomeIcon icon={["fab", "github"]} /> </span>
      Gist </button>
  )

}