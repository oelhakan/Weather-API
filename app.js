const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units +"&appid=" + apiKey;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const name = weatherData.name;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const description = weatherData.weather[0].description;
      res.write("<h1>The temperature in " + name + " is : " + temp + " degrees celcius</h1>");
      res.write("<h2>The weather is currently : " + description + "</h2>");
      res.write("<img src='" + imageURL + "'/>");
      res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
