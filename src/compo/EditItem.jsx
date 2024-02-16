import { useEffect, useState } from "react";
import { updateItem } from "../apiService";
import { getItemById } from "../apiService";
import { Link, useParams } from "react-router-dom";

const EditItem = () => {
  const [items, setItems] = useState({
    id: "",
    name: "",
    category: "",
    status: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.file[0];
    setItems({ ...items, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItems({ ...items, [name]: value });
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemdata = await getItemById(id);
        setItems(itemdata);
        setImagePreview(itemdata.photo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateItem(id, items);
      if (response.status === 200) {
        setSuccessMessage("Room update Successfully");
        const updateItemData = await getItemById(id);
        setItems(updateItemData);
        setImagePreview(updateItemData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error in updating item");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Edit item</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={items.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                status
              </label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={items.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={items.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label hotel-color">
                Photo
              </label>
              <input
                required
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  alt="Room preview"
                  style={{ maxWidth: "400px", maxHeight: "400" }}
                  className="mt-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to={"/existing-item"} className="btn btn-outline-info ml-5">
                back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Edit item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditItem;
