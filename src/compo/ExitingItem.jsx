import React, { useEffect, useState } from "react";
import { deleteItem, getAllItems } from "../apiService";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
function ExitingRoom() {
  const [items, setItems] = useState([
    {
      id: "",
      name: "",
      status: "",
      category: "",
      photo: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const result = await getAllItems();
      setItems(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteItem(id);
      if (result === "") {
        setSuccessMessage(`Item ${id} deleted successfully`);
        fetchItems();
      } else {
        console.error(`Error deleting item`);
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
      <>
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-between mb-3 mt-5">
            <h2>Existing items</h2>
          </div>

          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th> status</th>
                <th>category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="text-center">
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td className="gap-2">
                    <Link to={`/edit-item/${item.id}`} className="gap-2">
                      <span className="btn btn-info btn-sm">
                        <FaEye />
                      </span>
                      <span className="btn btn-warning btn-sm ml-5">
                        <FaEdit />
                      </span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ml-5"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    </>
  );
}

export default ExitingRoom;
