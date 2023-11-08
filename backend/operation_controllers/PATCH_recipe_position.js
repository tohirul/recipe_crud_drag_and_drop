// Import required modules and files
import httpStatus from "http-status";
import catchAsync from "../catchAsync.js";
import { recipeCollection } from "../index.js";

// Define a controller function for handling PATCH requests to update recipe positions
const PATCH_recipe_position = catchAsync(async (req, res) => {
  try {
    // Extract updated recipes from the request body
    const updatedRecipes = req.body.recipes;

    // Clear existing recipes in the collection and insert updated recipes
    await recipeCollection.deleteMany({}); // Delete all existing recipes from the collection
    await recipeCollection.insertMany(updatedRecipes); // Insert the updated recipes into the collection

    // Respond with a success message after updating recipes
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      success: true,
      message: "Recipes updated successfully",
    });
  } catch (error) {
    // Handle errors: log the error and respond with an internal server error message
    console.error(error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update recipes",
    });
  }
});

// Export the PATCH_recipe_position controller function for use in other parts of the application
export default PATCH_recipe_position;
