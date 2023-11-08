// Import required modules and files
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB for handling object IDs
import httpStatus from "http-status";
import catchAsync from "../catchAsync.js";
import { recipeCollection } from "../index.js";

// Define a controller function for handling GET requests to retrieve a single recipe by ID
const GET_recipe = catchAsync(async (req, res) => {
  // Extract the recipe ID from the request parameters
  const id = req.params.id;

  // Create a query object to find the recipe by its ID (using ObjectId)
  const query = { _id: new ObjectId(id) };

  // Retrieve the recipe from the recipeCollection based on the provided ID
  const recipe = await recipeCollection.findOne(query);

  // Respond with the retrieved recipe
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    success: true,
    message: "Recipe data successfully retrieved",
    recipe: recipe, // Include the retrieved recipe in the response
  });
});

// Export the GET_recipe controller function for use in other parts of the application
export default GET_recipe;
