
import express from "express";
import { createReview, deleteReview } from "../controllers/reviews.js";
import { catchAsyncErrors } from "../../utils/expressError.js";
export const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.route("/")
    .post(catchAsyncErrors(createReview));
reviewRoutes.route("/:id_review")
    .delete(catchAsyncErrors(deleteReview));