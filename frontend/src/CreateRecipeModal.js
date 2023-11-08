import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CreateRecipeModal({ fn, ...props }) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // Call the onSubmit prop function passed from the parent component
    fn(data);

    // Reset the form after successful submission
    reset();

    // Close the modal
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create A new Recipe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="form"
        >
          <label htmlFor="recipe-name">Name: </label>
          <input
            {...register("recipe-name", { required: true })}
            type="text"
            id="recipe-name"
          />{" "}
          <label htmlFor="recipe-ingredients">Ingredients: </label>
          <input
            {...register("recipe-ingredients", { required: true })}
            type="text"
            id="recipe-ingredients"
          />{" "}
          <label htmlFor="recipe-price">Price: </label>
          <input
            {...register("recipe-price", { required: true })}
            type="text"
            id="recipe-price"
          />{" "}
          <label htmlFor="sold-out">Sold Out: </label>
          <input
            {...register("sold-out", { required: true })}
            type="boolean"
            id="sold-out"
          />{" "}
          <label htmlFor="document-file">File: </label>
          <input
            {...register("file", { required: true })}
            type="file"
            accept=".jpg, .jpeg, .png"
            id="document-file"
          />
          <input
            type="submit"
            className="w-25 my-2 btn btn-primary"
            onClick={props.onHide}
            value="submit"
          />
        </form>
      </Modal.Body>
      {/*     <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
