import express from "express";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import methodOverride from 'method-override';
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import passport from "passport";
import localStrategy from "passport-local";
import { fileURLToPath } from "url";
import { catchAsyncErrors, ExpressError } from "./utils/expressError.js";
import { bookRoutes } from "./server/routes/books.js";
import { reviewRoutes } from "./server/routes/reviews.js";
import { userRoutes } from "./server/routes/users.js";
import { User } from "./server/models/users.js";


const url = "mongodb://127.0.0.1:27017/booktest";
const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sessionOptions = {
    secret: 'secret_code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: (1000 * 60 * 60 * 24 * 7)
    }
};

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", () => console.eroor.bind("Connection failed"));
db.once("open", () => console.log("Connected to database"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Make Flash messages available for All Templates:
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});


// Use User Routes:
app.use("/", userRoutes);

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
