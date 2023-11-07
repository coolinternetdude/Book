import { Book } from "./server/models/books.js";
import { Review } from "./server/models/reviews.js";

export const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
};

export const storeReturnTo = (req, res, next) => {
    if(req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

export const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    if(!book.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission!");
        return res.redirect(`/api/books/${id}`);
    }
    next();
};

export const isReviewAuthor = async (req, res, next) => {
    const { id, id_review } = req.params;
    const review = await Review.findById(id_review);

    if(!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission!");
        return res.redirect(`/api/books/${id}`);
    }
    next();
};