const mongoose = require("mongoose"); // Import mongoose for MongoDB interaction
const initData = require("./data.js"); // Import initial data to seed the database
const Listing = require("../models/listing.js"); // Import the Listing model
const { object } = require("joi");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // MongoDB connection string

// Main async function to handle DB operations
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // Delete all existing documents in the Listing collection
    await Listing.deleteMany({});
    // Insert new documents from the initial data
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6852bc2d9d0c238b027a334d",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (error) {
    // Log any errors that occur during initialization
    console.error("Error during initialization:", error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

// Execute the main function
main();
