// Import the required MongoClient from the MongoDB Node.js driver
import { MongoClient } from "mongodb";

// Define an asynchronous function to establish a database connection
async function initiateDatabaseConnection() {
  // MongoDB connection URI. Replace the placeholder values with your actual MongoDB connection details.
  const mongoURI = `mongodb+srv://tohirulislam:HQzLY4OZ61NgowYH@cluster0.br2j01g.mongodb.net/`;

  // Create a new MongoClient instance with the connection URI
  const client = new MongoClient(mongoURI);

  try {
    // Attempt to connect to the MongoDB database
    await client.connect();

    // Log a success message to the console upon successful connection
    console.log("Connected to Database!");

    // Return the MongoClient instance, which represents the active database connection
    return client;
  } catch (error) {
    // Handle connection errors: log the error message and rethrow the error
    console.error(error.message);
    throw error;
  }
}

// Export the initiateDatabaseConnection function to make it accessible in other files
export default initiateDatabaseConnection;
