// Import required modules and files
import httpStatus from "http-status";
import catchAsync from "../catchAsync.js";
import { bucket, imageCollection } from "../index.js";

// Define a controller function for handling POST requests to upload images
const POST_image = catchAsync(async (req, res) => {
  try {
    // Extract the image file from the request
    const imageFile = req.files.image;
    const fileBuffer = Buffer.from(imageFile.data, "base64");

    // Additional metadata properties for the image
    const metadata = {
      filename: imageFile.name, // Original filename of the uploaded image
      contentType: imageFile.mimetype, // Content type of the image (e.g., 'image/png')
      uploadedAt: new Date(), // Timestamp of the upload
      // Add other custom metadata properties here if needed
    };

    // Save the image file to GridFS with specified metadata
    const uploadStream = bucket.openUploadStream(imageFile.name, {
      metadata: metadata, // Attach metadata to the uploaded image
    });

    uploadStream.end(fileBuffer); // Write the image buffer to the GridFS upload stream

    // Get the GridFS file ID of the uploaded image
    const imageId = uploadStream.id;

    // Save additional metadata along with the GridFS file ID to a custom collection (imageCollection)
    await imageCollection.insertOne({
      files_id: imageId, // GridFS file ID of the uploaded image
      ...metadata, // Include other custom metadata properties here if needed
    });

    // Respond with a success message and the GridFS file ID of the uploaded image
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      success: true,
      message: "Image successfully uploaded",
      imageId: imageId, // GridFS file ID of the uploaded image
    });
  } catch (error) {
    // Handle errors: log the error and respond with an internal server error message
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal Server Error",
      error: error, // Include the error details in the response for debugging (not recommended in production)
    });
  }
});

// Export the POST_image controller function for use in other parts of the application
export default POST_image;
