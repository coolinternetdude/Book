
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true,
    },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

export const Review = mongoose.model("Review", reviewSchema);