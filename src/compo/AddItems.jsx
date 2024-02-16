import React, { useState } from "react";
import { addItems } from "../apiService";
const AddItems = () => {
  const [newItem, setNewItem] = useState({
    photo: null,
    name: "",
    category: "",
    status: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleItemInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewItem({ ...newItem, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addItems(
        newItem.photo,
        newItem.name,
        newItem.category,
        newItem.status
      );
      if (success !== undefined) {
        setSuccessMessage("A new item added successfully !");
        setNewItem({ photo: null, name: "", category: "", status: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding new item");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {successMessage && (
              <div className="alert alert-success fade show">
                {" "}
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">
                {" "}
                {errorMessage}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                name
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleItemInputChange}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  status
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="status"
                  name="status"
                  value={newItem.status}
                  onChange={handleItemInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  category
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleItemInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  item Photo
                </label>
                <input
                  required
                  name="photo"
                  id="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview  item photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  ></img>
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
                <button type="submit" className="btn btn-outline-primary ml-5">
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddItems;
