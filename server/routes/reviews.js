
import express from "express";
import { createReview, deleteReview } from "../controllers/reviews.js";
import { catchAsyncErrors } from "../../utils/expressError.js";
import { isLoggedIn, isReviewAuthor } from "../../middleware.js";
export const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.route("/")
    .post(isLoggedIn, catchAsyncErrors(createReview));
reviewRoutes.route("/:id_review")
    .delete(isLoggedIn, isReviewAuthor, catchAsyncErrors(deleteReview));