import express from "express";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import methodOverride from 'method-override';
import path from "path";
import { fileURLToPath } from "url";
import { catchAsyncErrors, ExpressError } from "./utils/expressError.js";
import { bookRoutes } from "./server/routes/books.js";
import { reviewRoutes } from "./server/routes/reviews.js";


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

// Use Book Routes:
app.use("/api/books", bookRoutes);

// Use Review Routes:
app.use("/api/books/:id/reviews", reviewRoutes);


app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found!!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "ERROR ! Something went wrong with the application" } = err;
    res.status(statusCode).render('books/error', { err });
});

app.listen(port, () => {
    console.log("Listening on port 8080!");
});


