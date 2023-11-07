
import express from "express";
import { getAllBooks, renderNewForm, createBook, showBook, updateBook, deleteBook, renderEditForm } from "../controllers/books.js";
import { catchAsyncErrors } from "../../utils/expressError.js";
import { isLoggedIn, isOwner } from '../../middleware.js';
export const bookRoutes = express.Router({ mergeParams: true });

bookRoutes.route('/') 
    .get(catchAsyncErrors(getAllBooks))
    .post(isLoggedIn, catchAsyncErrors(createBook));
bookRoutes.route('/new')
    .get(isLoggedIn, catchAsyncErrors(renderNewForm));
bookRoutes.route('/:id')
    .get(catchAsyncErrors(showBook))
    .put(isLoggedIn, isOwner, catchAsyncErrors(updateBook))
    .delete(isLoggedIn, catchAsyncErrors(deleteBook));
bookRoutes.route('/:id/edit')
    .get(isLoggedIn, isOwner, catchAsyncErrors(renderEditForm));
