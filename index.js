import express from "express";
import mongoose from "mongoose";
import { getAllBooks } from "./server/controllers/books.js";


const url = "mongodb://127.0.0.1:27017/booktest"
const app = express();
const port = 8080;
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", () => console.eroor.bind("Connection failed"));
db.once("open", () => console.log("Connected to database"));


app.set("view engine", "ejs");
app.route('/api/books').get(getAllBooks);


app.listen(port, () => {
    console.log("Listening on port 8080!");
})


