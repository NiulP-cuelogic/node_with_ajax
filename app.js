import express from "express";
import bodyParser from "body-parser";   
import http from "http";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
// import jwt from "jsonwebtoken";

var app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



var db = "mongodb://localhost/demo1";
mongoose.connect(db);
mongoose.Promise = global.Promise;
console.log("app is running ");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.use("/signup",userRoutes);

const port = 3001;
const server = http.createServer(app);

server.listen(port,()=>{
	console.log("Server listening on port ",port);
}); 
// console.log("app===>",app);

export default app;