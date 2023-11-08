import { ObjectId } from "mongodb";
import httpStatus from "http-status";
import { bucket, imageCollection, recipeCollection } from "../index.js";
import catchAsync from "../catchAsync.js";

const DELETE_recipe = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await recipeCollection.findOne({ image: id });
    console.log(result);

    await bucket.delete(new ObjectId(id));

    const deletedImage = await imageCollection.findOneAndDelete({
      files_id: new ObjectId(id),
    });

    const deletedRecipe = await recipeCollection.findOneAndDelete({
      _id: result._id,
    });
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      success: true,
      message: "Recipe and associated image files deleted successfully",
      result: {
        deletedRecipe: deletedRecipe,
        deletedImage: deletedImage,
      },
    });
  } catch (error) {
    console.error("Error deleting recipe and image files:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

export default DELETE_recipe;
