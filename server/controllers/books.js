
import { Book, bookGenre, bookLanguage } from '../models/books.js';

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