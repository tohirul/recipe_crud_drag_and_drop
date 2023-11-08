import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

export default function ImagePopUpModal(props) {
  const [toShow, setToShow] = useState(null);
  const { recipe, recipes, ...modalData } = props;
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (recipe) {
      const rec = recipes.find((item) => item._id === recipe);
      setToShow(rec);
    }
  }, [recipe, recipes]);

  useEffect(() => {
    if (toShow !== null) {
      const img = new Image();
      img.onload = () => {
        setImage(img.src);
        setIsLoading(false);
      };
      img.src = `http://localhost:4000/images/${toShow.image}`;
    }
  }, [toShow, isLoading]);

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
            <span className="visually-hidden">Loading...</span>
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
          <img src={image} alt={toShow?.name} className="img-fluid" />
          <p>{toShow.name}</p>
        </Modal.Body>
      </Modal>
    );
  }
}
