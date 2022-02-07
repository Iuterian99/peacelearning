const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const publicRoutes = require("./routes/publicRoutes");
const app = express();
require("dotenv").config();



app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use("/", publicRoutes);

const port = process.env.PORT||9000;

app.listen(port, ()=>{
  console.log(`Server running at the port ${port}`);
});
