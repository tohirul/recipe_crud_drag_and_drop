// Import required modules
import express from "express"; // Import Express.js for building the API
import cors from "cors"; // Import CORS middleware for handling Cross-Origin Resource Sharing
import fileUpload from "express-fileupload"; // Import fileUpload middleware for handling file uploads

// Create an instance of Express application
const Application = express();

// Use CORS middleware to allow cross-origin requests
Application.use(cors());

// Use fileUpload middleware to handle file uploads
Application.use(fileUpload());

// Parse incoming JSON requests
Application.use(express.json());

// Parse incoming URL-encoded data with extended options
Application.use(express.urlencoded({ extended: true }));

// Define the port number on which the server will listen
const port = 4000;

// Start the server and listen for incoming requests on the specified port
Application.listen(port, () => {
  console.log("Server is online!");
});

// Create an object containing the Express application instance for export
const app = {
  Application,
};

// Export the app object to make it accessible in other files
export default app;
