const mongoose = require("mongoose");
const WeatherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide city name"],
    maxlength: 50,
  },
  data: {
    type: Object,
    required: [true, "Data is required"]
  },
});

module.exports = mongoose.model("Weather", WeatherSchema);
