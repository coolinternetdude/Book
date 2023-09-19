import express from "express";
import mongoose from "mongoose";
import { getAllBooks, renderNewForm, createBook, showBook, updateBook, deleteBook, renderEditForm } from "./server/controllers/books.js";
import methodOverride from 'method-override';


const url = "mongodb://127.0.0.1:27017/booktest";
const app = express();
const port = 8080;
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", () => console.eroor.bind("Connection failed"));
db.once("open", () => console.log("Connected to database"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

// Book Routes:
app.route('/api/books').get(getAllBooks);
app.route('/api/books/new').get(renderNewForm).post(createBook);
app.route('/api/books/:id').get(showBook).put(updateBook).delete(deleteBook);
app.route('/api/books/:id/edit').get(renderEditForm);


app.listen(port, () => {
    console.log("Listening on port 8080!");
});


