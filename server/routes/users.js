
import express from "express";
import passport from "passport";
import { renderRegisterForm, renderLoginForm, registerUser, login, logout } from "../controllers/users.js";
import { catchAsyncErrors } from "../../utils/expressError.js";
import { storeReturnTo } from "../../middleware.js";
export const userRoutes = express.Router();

userRoutes.route("/register")
    .get(renderRegisterForm)
    .post(catchAsyncErrors(registerUser));

userRoutes.route("/login")
    .get(renderLoginForm)
    .post(storeReturnTo, passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), catchAsyncErrors(login));

userRoutes.route("/logout")
    .get(logout);