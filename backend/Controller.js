// Import controller functions for different HTTP operations
import DELETE_recipe from "./operation_controllers/DELETE_recipe.js";
import GET_image from "./operation_controllers/GET_image.js";
import GET_recipe from "./operation_controllers/GET_recipe.js";
import GET_recipes from "./operation_controllers/GET_recipes.js";
import PATCH_recipe_position from "./operation_controllers/PATCH_recipe_position.js";
import POST_image from "./operation_controllers/POST_image.js";
import POST_recipe from "./operation_controllers/POST_recipe.js";

// Create a Controller object that maps HTTP operations to controller functions
const Controller = {
  allRecipes: GET_recipes, // GET request to retrieve all recipes
  singleRecipe: GET_recipe, // GET request to retrieve a single recipe
  imageURL: GET_image, // GET request to retrieve an image URL
  uploadImage: POST_image, // POST request to upload an image
  uploadRecipe: POST_recipe, // POST request to upload a new recipe
  sortRecipePostion: PATCH_recipe_position, // PATCH request to update recipe position
  removeRecipe: DELETE_recipe, // DELETE request to remove a recipe
};

// Export the Controller object to make it accessible in other files
export default Controller;
