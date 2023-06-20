require("dotenv").config();
require("express-async-errors");
const express = require("express");
const weather = require("./weatherapis/routes/weather")
const connectDB = require("./db/connect");
const app = express();
app.use(express.json());



// routes
app.use("/api/v1/weather", weather);

const port = process.env.PORT || 3005;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();