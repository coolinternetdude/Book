
import mongoose from 'mongoose'
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
    // reviews: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Review"
    // }],
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

export const Book = mongoose.model("Book", bookSchema);
export const bookGenre = Book.schema.path("genre").enumValues;
export const bookLanguage = Book.schema.path("language").enumValues;
