
import { Book } from '../models/books.js';

export const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.render('books/books.ejs', { books });
}

export const renderNewForm = (req, res) => {
    const bookGenreEnums = Book.schema.path("genre").enumValues;
    const bookLanguageEnums = Book.schema.path("language").enumValues;
    res.render("books/new", { bookGenreEnums, bookLanguageEnums });
}

export const createBook = async (req, res) => {
    const book = new Book(req.body.book);
    await book.save();
    res.send("Hi");
}