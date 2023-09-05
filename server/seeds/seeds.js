const books = require("./books");
const expess = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");



const uri = "mongodb://127.0.0.1:27017/booktest"
const client = new MongoClient(uri);
mongoose.connect(uri)
const db = mongoose.connection;
db.on("error", () => console.eroor.bind("Connection failed"));
db.once("open", () => console.log("Connected to database"));


const seedDb = async () => {
    const database = client.db("booktest");
    const book = database.collection("books");
    books.forEach(async (el) => {
        const result = await book.insertOne(el);
        console.log(result);
    })
}

seedDb();






