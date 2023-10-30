
import mongoose from 'mongoose';
import { Review } from './reviews.js';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    genre: {
        type: String,
        required: true,
        enum: ["sport", "history", "science", "psychology"]
    },
    published: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ["english", "french", "arabic"]
    }
});

bookSchema.post("findOneAndDelete", async (book) => {
    if(book.reviews.length) {
        await Review.deleteMany({ _id: { $in: book.reviews } });
    }
});

export const Book = mongoose.model("Book", bookSchema);
export const bookGenre = Book.schema.path("genre").enumValues;
export const bookLanguage = Book.schema.path("language").enumValues;
