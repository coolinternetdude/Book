
import { Book } from '../models/books.js';

export const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.render('books.ejs', { books });
}