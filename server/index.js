const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
// const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../build')));

// app.use(cors({origin: 'http://localhost:3000'}));


app.post('/postgist', function (req, res) {
  app.set('new_gist', req.body);
  res.send(200);
})

app.get('/login', function (req, res) {

  const clientId = process.env.CLIENT_ID;
  res.redirect(`https://github.com/login/oauth/authorize?scope=gist&client_id=${clientId}`);
})

app.get('/callback', async function (req, res) {

  // Get access key
  const { code } = req.query;
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  });
  const authUrl = "https://github.com/login/oauth/access_token?" + params;
  try {
    const result = await axios.post(authUrl);
    const data = new URLSearchParams(result.data);
    var accessToken = data.get('access_token');
  } catch (e) {
    console.error(e);
  }

  // Call api with access token
  const newGist = app.get('new_gist');
  const api = "https://api.github.com/gists";
  try {
    await axios.post(api, newGist,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (e) {
    console.error(e.response.data);
  }

  // Return to app
  // const filePath = path.join(__dirname, '/public/index.html');
  // res.sendFile(filePath);
  // res.redirect('http://localhost:3000');
  res.json({ message: "Gist posted!" });
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

