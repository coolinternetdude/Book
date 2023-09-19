
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
    console.log(book);
    await book.save();
    res.redirect('/api/books');
}

export const showBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render('books/show', { book });
}

export const renderEditForm = async (req, res) => {
    const id = req.params.id;
    const foundBook = await Book.findById(id);
    res.render("books/edit", { foundBook, bookGenre, bookLanguage });
}

export const updateBook = async (req, res) => {
    const id = req.param.id;
    await Book.findByIdAndUpdate(id, req.body.book);
    res.redirect(`/api/books/${id}`);
}