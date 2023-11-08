import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

// Functional component for displaying a recipe's image in a modal
export default function ImagePopUpModal(props) {
  // State variables for recipe data, image URL, and loading status
  const [toShow, setToShow] = useState(null);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Extract necessary props
  const { recipe, recipes, ...modalData } = props;

  // Effect to update image URL and loading status when recipe or recipes change
  useEffect(() => {
    setIsLoading(true);
    if (recipe) {
      // Find the selected recipe from the recipes array
      const rec = recipes.find((item) => item._id === recipe);
      setToShow(rec);
    }
  }, [recipe, recipes]);

  // Effect to load the image and update loading status
  useEffect(() => {
    if (toShow !== null) {
      const img = new Image();
      img.onload = () => {
        setImage(img.src);
        setIsLoading(false);
      };
      // Set image source URL
      img.src = `http://localhost:4000/images/${toShow.image}`;
    }
  }, [toShow, isLoading]);

  // Render loading spinner while image is loading, and the image and recipe name once loaded
  if (isLoading) {
    return (
      <Modal
        {...modalData}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Please wait !!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually impaired">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal
        {...modalData}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pizza Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display loaded image and recipe name */}
          <img src={image} alt={toShow?.name} className="img-fluid" />
          <p>{toShow.name}</p>
        </Modal.Body>
      </Modal>
    );
  }
}
