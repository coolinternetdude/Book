
import { Book, bookGenre, bookLanguage } from '../models/books.js';
import { ExpressError } from '../../utils/expressError.js';

export const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.render('books/books.ejs', { books });
}

export const renderNewForm = (req, res) => {
    res.render("books/new", { bookGenre, bookLanguage });
}

export const createBook = async (req, res) => {
    const book = new Book(req.body.book);
    await book.save();
    res.redirect('/api/books');
}

export const showBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if(!book) {
        throw new ExpressError("Book not found!", 404);
    }
    res.render('books/show', { book });
}

export const renderEditForm = async (req, res) => {
    const id = req.params.id;
    const foundBook = await Book.findById(id);
    if(!foundBook) {
        throw new ExpressError("Book not found!", 404);
    }
    res.render("books/edit", { foundBook, bookGenre, bookLanguage });
}

export const updateBook = async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndUpdate(id, req.body.book);
    res.redirect(`/api/books/${id}`);
}

export const deleteBook = async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.redirect("/api/books");
}