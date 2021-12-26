import { cssString } from "../util";

export function Gist({speed, coloursList, gradient, scroll, cssClass}) {

  const selector = `.${cssClass}`;
  let gistContent = cssString(speed, coloursList, gradient, scroll, selector);
  gistContent += "\n\n /* Created using dynamicgradients.com */"

  function postGist() {
    const data = {
      files: {
        "dynamic_gradient.css": {
          content: gistContent,
        },
      },
    };
    fetch("http://localhost:5000/postgist", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => console.log(resp.body))
    .then(() => window.location = 'http://localhost:5000/login')
    .catch((e) => console.error(e));
  }

  return (
      <button onClick={postGist}>Create Gist</button>
  )

}