
import { User } from "../models/users.js";
import { ExpressError } from "../../utils/expressError.js";

export const renderRegisterForm = (req, res) => {
    res.render("users/register");
};

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body.user;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);

        // Login from Registration:
        req.login(registeredUser, (err) => {
            if(err)
                return next(err);

            req.flash("success", "Welcome to Our Books Website.");
            res.redirect("/api/books");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
};

export const renderLoginForm = (req, res) => {
    res.render("users/login");
};

export const login = (req, res) => {
    const redirectUrl = res.locals.returnTo || "/api/books";
    // delete req.sessions.returnTo;
    req.flash("success", "Welcome back!");
    res.redirect(redirectUrl);
};

export const logout = (req, res) => {
    req.logout((err) => {
        if(err)
            return next(err);

        req.flash('success', 'Goodbye!');
        res.redirect('/api/books');
    });
};