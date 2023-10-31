
import express from "express";
import { getAllBooks, renderNewForm, createBook, showBook, updateBook, deleteBook, renderEditForm } from "../controllers/books.js";
import { catchAsyncErrors } from "../../utils/expressError.js";
export const bookRoutes = express.Router({ mergeParams: true });

bookRoutes.route('/')
    .get(catchAsyncErrors(getAllBooks));
bookRoutes.route('/new')
    .get(catchAsyncErrors(renderNewForm))
    .post(catchAsyncErrors(createBook));
bookRoutes.route('/:id')
    .get(catchAsyncErrors(showBook))
    .put(catchAsyncErrors(updateBook))
    .delete(catchAsyncErrors(deleteBook));
bookRoutes.route('/:id/edit')
    .get(catchAsyncErrors(renderEditForm));
