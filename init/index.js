const mongoose = require("mongoose");
const { webcrypto } = require("node:crypto");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

if (!globalThis.crypto) {
    globalThis.crypto = webcrypto;
}

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

const main = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connected to DB");
        await initDB();
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
    }
};

main();