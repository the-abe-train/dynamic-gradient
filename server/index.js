const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.post('/postgist', function (req, res) {
  app.set('new_gist', req.body);
  res.sendStatus(200);
})

app.get('/login', function (req, res) {
  const clientId = process.env.CLIENT_ID;
  res.redirect(`https://github.com/login/oauth/authorize?scope=gist&client_id=${clientId}`);
})

app.get('/callback', async function (req, res) {

  try {

    // Get access key
    const { code } = req.query;
    const params = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    });
    const authUrl = "https://github.com/login/oauth/access_token?" + params;
    const authResult = await axios.post(authUrl);
    const authData = new URLSearchParams(authResult.data);
    const accessToken = authData.get('access_token');
    console.log(accessToken);

    // Get user's username
    const userApi = "https://api.github.com/user";
    const userResult = await axios.get(userApi,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    var { login } = userResult.data;
    console.log("User login:", login);

    // Call api with access token
    const newGist = app.get('new_gist');
    const gistApi = "https://api.github.com/gists";
    await axios.post(gistApi, newGist,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // Catch errors from any of the api calls
  } catch (e) {
    console.error("Error:", e.response.data);
  }

  // Return to app
  // const filePath = path.join(__dirname, '/public/index.html');
  // res.sendFile(filePath);
  res.redirect(`https://gist.github.com/${login}`);
  // res.json({ message: "Gist posted!" });
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})


app.listen(port, () => {
  console.log(`Listening at ${process.env.REACT_APP_DOMAIN}`)
})

