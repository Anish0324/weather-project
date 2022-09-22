const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apikey = "1420579ad4ae47497d2b8327f91dd84f";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric";
  https.get(url, function(response) {
    response.on("data", function(data) {
      const wd = JSON.parse(data);
      const temp = wd.main.temp;
      const wde = wd.weather[0].description;
      const icon = wd.weather[0].icon;
      const imgUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>temprature in india is " + temp + " degree celsius</h1>");
      res.write("<h1>weather discripution is " + wde + "</h1>");
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});
/*
 */
app.listen(3000, function() {
  console.log("server is working");
});
