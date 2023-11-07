
import { Review } from "../models/reviews.js";
import { Book } from "../models/books.js";
import { ExpressError } from "../../utils/expressError.js";

export const createReview = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if(!book) {
        // throw new ExpressError("Book not found!!", 404);
        req.flash("error", "Cannot find that Book!");
        return res.redirect("/api/books");
    }

    const review = new Review(req.body.review);
    review.author = req.user._id;
    book.reviews.push(review);
    await book.save();
    await review.save();
    
    req.flash("success", "Review added successfully.");
    res.redirect(`/api/books/${book.id}`);
};

export const deleteReview = async (req, res) => {
    const { id, id_review } = req.params;
    const book = await Book.findById(id);
    if(!book) {
        // throw new ExpressError("Book not found!", 404);
        req.flash("error", "Cannot find that Book!");
        return res.redirect("/api/books");
    }

    await Book.findOneAndUpdate({ _id: id }, { $pull: { reviews: id_review }});
    await Review.findByIdAndDelete(id_review);

    req.flash("success", "Review deleted successfully.");
    res.redirect(`/api/books/${id}`);
};