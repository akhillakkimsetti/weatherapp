const { StatusCodes } = require("http-status-codes");
let request = require("request");
const Weather = require("../models/Weather");
const { NotFoundError, BadRequestError } = require("../errors");

const getWeather = async (city) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weatherAPI_KEY}`;
  const dataObj = {};

  await request(url, function (err, response, body) {
    if (err) {
      dataObj.err = err;
    } else {
      console.log(JSON.parse(body));
      dataObj.data = JSON.parse(body);
    }
  });

  return dataObj;
};

const getWeatherDetails = async (req, res) => {
  const { city } = req.body;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weatherAPI_KEY}`;

  await request(url, function (err, response, body) {
    if (err) {
      res.json({ err });
    } else {
      res.json(JSON.parse(body));
    }
  });
};

const postWeatherDetails = async (req, res) => {
  const { name } = req.body;
  setInterval(myTimer, 20000);
  let weatherArray = [];
  async function myTimer() {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.weatherAPI_KEY}`;
    let weatherData = {};
    weatherData.name = name;
    await request(url, async function (err, response, body) {
      if (err) {
        throw new NotFoundError(err);
      } else {
        weatherData.data = JSON.parse(body);
        const weather = await Weather.create(weatherData);
        if (!weather) {
          throw new NotFoundError(
            "Something went wrong, Please try again later"
          );
        }
        if (weather) weatherArray.push(weather);
        if (weatherArray.length == 1)
          res.status(StatusCodes.CREATED).json({ weather, weatherData });
      }
    });
  }
};

const getAllWeatherDetails = async (req, res) => {
  const weatherDetails = await Weather.find({});
  res
    .status(StatusCodes.OK)
    .json({ data: weatherDetails, count: weatherDetails.length });
};

module.exports = {
  getWeatherDetails,
  postWeatherDetails,
  getAllWeatherDetails,
};
