// Import required modules and files
import httpStatus from "http-status";
import catchAsync from "../catchAsync.js";
import { recipeCollection } from "../index.js";

// Define a controller function for handling GET requests to retrieve all recipes
const GET_recipes = catchAsync(async (req, res) => {
  // Retrieve all recipes from the recipeCollection using find() method
  const cursor = recipeCollection.find({});

  // Convert the cursor result to an array of recipes
  const recipes = await cursor.toArray();

  // Respond with the retrieved recipes
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    success: true,
    message: "All data successfully retrieved",
    recipes: recipes, // Include the retrieved recipes in the response
  });
});

// Export the GET_recipes controller function for use in other parts of the application
export default GET_recipes;
