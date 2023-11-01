
import { Book, bookGenre, bookLanguage } from '../models/books.js';
import { ExpressError } from '../../utils/expressError.js';

export const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.render('books/books.ejs', { books });
}

export const renderNewForm = async (req, res) => {
    res.render("books/new", { bookGenre, bookLanguage });
}

export const createBook = async (req, res) => {
    if(!req.body.book)
        throw new ExpressError("Invalid Book Data!", 400);
    const book = new Book(req.body.book);
    await book.save();

    req.flash("success", "Book added successfully.");
    res.redirect('/api/books');
}

export const showBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate("reviews");
    if(!book) {
        // throw new ExpressError("Book not found!", 404);
        req.flash("error", "Cannot find that Book!");
        return res.redirect("/api/books");
    }
    res.render('books/show', { book });
}

export const renderEditForm = async (req, res) => {
    const id = req.params.id;
    const foundBook = await Book.findById(id);
    if(!foundBook) {
        // throw new ExpressError("Book not found!", 404);
        req.flash("error", "Cannot find that Book!");
        return res.redirect("/api/books");
    }
    res.render("books/edit", { foundBook, bookGenre, bookLanguage });
}

export const updateBook = async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndUpdate(id, req.body.book);

    req.flash("success", "Book updated successfully.");
    res.redirect(`/api/books/${id}`);
}

export const deleteBook = async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndDelete(id);
    
    req.flash("success", "Book deleted successfully.");
    res.redirect("/api/books");
}