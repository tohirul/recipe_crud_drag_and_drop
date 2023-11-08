import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Table } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import ImagePopUpModal from "./ImagePopUpModal";
import CreateRecipeModal from "./CreateRecipeModal";

function App() {
  // State variables for managing recipes, modals, drag-and-drop functionality, and data fetching
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [refetch, setRefetch] = useState(false);

  // Fetch data from the server when the page loads
  window.onload = () => {
    setRefetch(true);
  };

  // UseEffect to fetch recipes when refetch state changes
  useEffect(() => {
    if (refetch) {
      console.log("Started fetching...");
      const fetchData = async () => {
        const url = "http://localhost:4000/recipes";
        await axios
          .get(url)
          .then((data) => {
            setRecipes(data.data.recipes);
            console.log(data.data.recipes);
          })
          .catch((err) => console.error(err));
        console.log("Finished fetching!!!");
      };
      fetchData();
    }
    setRefetch(false);
  }, [setRecipes, recipes, refetch]);

  // Function to handle form submission for adding a new recipe
  const onSubmit = async (data) => {
    // Code for handling form submission, image upload, and recipe creation
    // ...
    console.log(data, "Data submission started !!!");

    const imageData = new FormData();
    imageData.append("image", data["file"]["0"]);

    let image;
    try {
      const response = await axios.post(
        "http://localhost:4000/image-upload",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      image = response.data.imageId;
      console.log("New Image created successfully", response.data);
    } catch (error) {
      console.error("Error creating recipe", error);
    }

    const formData = new FormData();
    formData.append("recipe-name", data["recipe-name"]);
    formData.append("recipe-ingredients", data["recipe-ingredients"]);
    formData.append("recipe-price", data["recipe-price"]);
    formData.append("sold-out", data["sold-out"]);
    formData.append("image", image);
    try {
      const response = await axios.post(
        "http://localhost:4000/submit-new-recipe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Recipe created successfully", response.data);

      setRefetch(true);
      // Close the modal or handle success as needed
    } catch (error) {
      console.error("Error creating recipe", error);
      // Handle error
    }
    // Set refetch to true to fetch updated data after adding a new recipe
    setRefetch(true);
    // Close the modal or handle success as needed
  };

  // Refs for drag-and-drop functionality
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Function to handle sorting of recipes using drag-and-drop
  const handleSort = () => {
    // Code for handling drag-and-drop sorting of recipes
    console.log("Handle sorting!!!");
    // * Copy Array
    let dupRecipe = [...recipes];

    // * remove and save drag item content
    const draggedItemContent = dupRecipe.splice(dragItem.current, 1)[0];

    // * switch position
    dupRecipe.splice(dragOverItem.current, 0, draggedItemContent);

    // * reset position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // ! update the actual recipes
    handleSaveChanges(dupRecipe);
  };

  // Function to save changes after sorting recipes
  const handleSaveChanges = (dupRecipe) => {
    // Code for saving sorted recipes to the server
    const url = "http://localhost:4000/update-recipes";
    setRecipes(dupRecipe);
    axios
      .patch(
        url,
        { recipes: dupRecipe },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        // setHasChanges(false);
        console.log("Recipes updated successfully!");
        console.log("Sorted Recipes: ", dupRecipe);
        setRefetch(true);
      })
      .catch((err) => console.error(err));
  };

  // Function to handle removing a recipe
  const handleRemove = async (id) => {
    // Code for handling recipe removal
    console.log("Removing by :", id);
    const url = `http://localhost:4000/recipes/${id}`;
    let res;

    console.log("Image Removal started");
    await axios
      .delete(url)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
        res = response;
      })
      .catch((error) => {
        console.error(error);
      });
    setRefetch(true);
    console.log(res);
  };

  // Array representing table header columns
  const arrTHead = [
    "#",
    "Recipe Name",
    "Recipe Ingredients",
    "Recipe Price",
    "Image",
    "Remove",
    "Action",
  ];

  // JSX for rendering the component
  return (
    <div className="App">
      <h1>Recipe Data</h1>
      {/** Add data modal button */}
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add new Recipe
      </Button>
      <br />
      <br />
      <Table variant="primary">
        <thead>
          <tr>
            {arrTHead.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            /* !refetch && */
            recipes.length > 0 &&
              recipes.map((recipe, idx) => (
                <tr
                  key={idx}
                  draggable={isDraggable}
                  onDragStart={(e) => (dragItem.current = idx)}
                  onDragEnter={(e) => (dragOverItem.current = idx)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <td>{idx + 1}</td>
                  <td>{recipe.name}</td>
                  <td>{recipe.ingredients}</td>
                  <td>{recipe.price}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="btn-sm"
                      onClick={() => {
                        setRecipe(recipe._id);
                        //  getRecipeData(recipe._id);
                        setImageModalShow(true);
                      }}
                    >
                      Open Image
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        console.log(recipe);
                        handleRemove(recipe.image);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                  <td className="action py-3 d-flex justify-content-center align-items-center">
                    <span
                      className="action-container"
                      onMouseDown={() => setIsDraggable(true)}
                      onMouseUp={() => setIsDraggable(false)}
                    >
                      <FaBars />
                    </span>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </Table>
      {/* <ImageComp /> */}
      <CreateRecipeModal
        show={modalShow}
        fn={onSubmit}
        onHide={() => setModalShow(false)}
      />
      {
        <ImagePopUpModal
          recipe={recipe}
          recipes={recipes}
          show={imageModalShow}
          onHide={() => setImageModalShow(false)}
        />
      }
    </div>
  );
}

export default App;
