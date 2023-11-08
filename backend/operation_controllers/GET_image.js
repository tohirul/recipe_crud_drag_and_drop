import { ObjectId } from "mongodb";
import catchAsync from "../catchAsync.js";
import { bucket } from "../index.js";
import httpStatus from "http-status";

const GET_image = catchAsync(async (req, res) => {
  try {
    const imageId = new ObjectId(req.params.id);

    // Get file metadata from the fs.files collection
    const metadata = await bucket.find({ _id: imageId }).toArray();
    console.log(metadata);
    // If no metadata is found, return a 404 response
    if (metadata.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Image not found",
      });
    }

    // Create a readable stream from the GridFS file
    const downloadStream = bucket.openDownloadStream(imageId);

    // Set response headers
    res.setHeader("Content-Type", metadata[0].metadata.contentType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${metadata[0].filename}`
    );

    // Pipe the image data to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
});

export default GET_image;
