
const mongoose = require("mongoose");
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

module.exports = mongoose.model("Book", bookSchema);