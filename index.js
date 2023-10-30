import express from "express";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import { getAllBooks, renderNewForm, createBook, showBook, updateBook, deleteBook, renderEditForm } from "./server/controllers/books.js";
import { createReview, deleteReview } from "./server/controllers/reviews.js";
import methodOverride from 'method-override';
import path from "path";
import { fileURLToPath } from "url";
import { catchAsyncErrors, ExpressError } from "./utils/expressError.js";
import { Review } from "./server/models/reviews.js";
import { Book } from "./server/models/books.js";


const url = "mongodb://127.0.0.1:27017/booktest";
const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", () => console.eroor.bind("Connection failed"));
db.once("open", () => console.log("Connected to database"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Book Routes:
app.route('/api/books')
    .get(catchAsyncErrors(getAllBooks));
app.route('/api/books/new')
    .get(catchAsyncErrors(renderNewForm))
    .post(catchAsyncErrors(createBook));
app.route('/api/books/:id')
    .get(catchAsyncErrors(showBook))
    .put(catchAsyncErrors(updateBook))
    .delete(catchAsyncErrors(deleteBook));
app.route('/api/books/:id/edit')
    .get(catchAsyncErrors(renderEditForm));

// Review Routes:
app.route("/api/books/:id/reviews")
    .post(catchAsyncErrors(createReview))
app.route("/api/books/:id/reviews/:id_review")
    .delete(catchAsyncErrors(deleteReview));


app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found!!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "ERROR ! Something went wrong with the application" } = err;
    res.status(statusCode).render('books/error', { err });
})

app.listen(port, () => {
    console.log("Listening on port 8080!");
});


