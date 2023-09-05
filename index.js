require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

let urlBank = [];

// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  function esURLValida(url) {
    // Expresión regular para verificar una URL válida
    const urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  }
  // function isValidURL(inputURL) {
  //   try {
  //     new URL(inputURL);
  //     return true;
  //   } catch (error) {
  //      res.json({ error: "invalid url" });
  //   }
  // }
  // if (isValidURL(req.body.url)) {
  //   // La URL es válida
  //   urlBank.push(req.body.url);
  //   res.json({ original_url: req.body.url, short_url: urlBank.length });
  // }
  if (esURLValida(req.body.url)) {
    urlBank.push(req.body.url);
    res.json({ original_url: req.body.url, short_url: urlBank.length });
  } else {
    res.json({ error: "invalid url" });
  }
});

app.get("/api/shorturl/:ip", function (req, res) {
  let indexOFLink = req.params.ip - 1;
  res.redirect(`${urlBank[indexOFLink]}`);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
