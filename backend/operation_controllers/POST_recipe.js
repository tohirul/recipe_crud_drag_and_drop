// Import required modules and files
import httpStatus from "http-status";
import catchAsync from "../catchAsync.js"; // Import the catchAsync utility for handling asynchronous errors
import { recipeCollection } from "../index.js"; // Import the recipe collection from the index file

// Define a controller function for handling POST requests to create a new recipe
const POST_recipe = catchAsync(async (req, res) => {
  try {
    // Extract recipe data from the request body
    const recipeData = req.body;

    // Create a recipe object with extracted data from the request body
    const recipe = {
      name: recipeData["recipe-name"],
      ingredients: recipeData["recipe-ingredients"],
      price: recipeData["recipe-price"],
      soldOut: recipeData["sold-out"] === "true" ? true : false,
      image: recipeData["image"],
    };

    // Insert the created recipe object into the recipe collection
    const result = await recipeCollection.insertOne(recipe);

    // Respond with a success message and the inserted recipe data
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      success: true,
      message: "Recipe data and file successfully uploaded",
      recipe: result.data,
    });
  } catch (error) {
    // Handle errors: log the error and respond with an internal server error message
    console.error("Error uploading file and data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal Server Error",
      error: error, // Include the error details in the response for debugging (not recommended in production)
    });
  }
});

// Export the POST_recipe controller function for use in other parts of the application
export default POST_recipe;
