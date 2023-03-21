//import package
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });

//create app server
const app = express();

//import routes
const products = require("./routes/productsRoute");
const dummyJsonRoute = require("./routes/dummyJsonRoute");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api", products);
app.use("/dummyjson", dummyJsonRoute);

//listen
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
