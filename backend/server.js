const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/ToDoRoutes");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(express.json());     // parse the middleware 
app.use(cors());    // frontend and backend connectivity 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);     // middleware for routes .... http://localhost:5000/api/ ....

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));