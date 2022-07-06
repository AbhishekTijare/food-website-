const express = require("express");
 const userRoutes = require("./src/user/routes/user");
const restaurantRoutes = require("./src/restaurant/routes/restaurant");
const mongodb = require("./config/mongodb.js");
const bodyParser= require("body-parser");
 const auth = require("./src/middlewares/auth");
 const cors = require("cors"); 

// STep 2: Create server and listen
const server = express();
server.listen(4400);
server.use(cors());

// Connect to database.
mongodb.localconnect();

// Configure routes
server.use(bodyParser.json());
server.use("/api/user",userRoutes);
server.use("/api/restaurant", restaurantRoutes);

// Step3: Create default response.
server.get("/", (req, res)=>{
    res.end("Hello world from Express");
});

console.log("Server is listening on 4400");