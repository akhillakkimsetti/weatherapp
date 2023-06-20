const express = require("express");
const router = express.Router();
const {
  getWeatherDetails,
  postWeatherDetails,
  getAllWeatherDetails
} = require("../controllers/weather");

router.route("/").post(getWeatherDetails);
router.route("/start").post(postWeatherDetails);
router.route("/all").get(getAllWeatherDetails);

module.exports = router;
