// Import necessary modules and files
import httpStatus from "http-status";
import { GridFSBucket } from "mongodb";
import initiateDatabaseConnection from "./DatabaseConnection.js";
import app from "./app.js";
import Controller from "./Controller.js";

// Destructure the Application object from the imported app module
const { Application } = app;

// Establish database connection and create collections
export const client = await initiateDatabaseConnection();
export const database = client.db("database");
export const bucket = new GridFSBucket(database, {
  bucketName: "fs",
});
export const recipeCollection = database.collection("recipes");
export const imageCollection = database.collection("images");

// Initialize the server and set up routes
async function initializeServer() {
  try {
    // Root endpoint to check server status
    Application.get("/", (req, res) => {
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        success: true,
        message: "Server is live and ready to use",
      });
    });

    // Test endpoint to check application connectivity
    Application.get("/test", (req, res) => {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        success: true,
        message: "Application successfully connected",
      });
    });

    // Endpoint to retrieve all recipes
    Application.get("/recipes", Controller.allRecipes);

    // Endpoint to retrieve a single recipe by ID
    Application.get("/recipes/:id", Controller.singleRecipe);

    // Endpoint to retrieve an image URL by ID
    Application.get("/images/:id", Controller.imageURL);

    // Endpoint to upload an image
    Application.post("/image-upload", Controller.uploadImage);

    // Endpoint to submit a new recipe
    Application.post("/submit-new-recipe", Controller.uploadRecipe);

    // Endpoint to update recipe positions
    Application.patch("/update-recipes", Controller.sortRecipePostion);

    // Endpoint to delete a recipe by ID
    Application.delete("/recipes/:id", Controller.removeRecipe);
  } catch (error) {
    // Handle errors and log error messages
    console.error(error.message);
  }
}

// Call the initializeServer function to start the server
initializeServer();
