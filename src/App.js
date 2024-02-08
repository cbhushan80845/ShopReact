import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { getItem, addItem } from "./apiService";

function App() {
  const [data, setData] = useState([]);

  const [formdata, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    photo: "",
  });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getItem();
        setData(result);
        console.log(result);
      } catch (error) {}
    };
    fetchDataFromApi();
  }, []);
  const handler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const add = () => {
    addItem(formdata);
  };
  return (
    <>
      <h1>shop</h1>
      <div className="container">
        <form className="form">
          <div>
            <label>
              name:
              <input
                type="text"
                value={formdata.name}
                name="name"
                onChange={handler}
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <input
                type="text"
                value={formdata.status}
                name="status"
                onChange={handler}
              />
            </label>
          </div>
          <div>
            <label>
              category:
              <input
                type="text"
                value={formdata.category}
                name="category"
                onChange={handler}
              />
            </label>
          </div>
          <div>
            <label>
              photo:
              <input
                type="file"
                value={formdata.photo}
                name="photo"
                onChange={handler}
              />
            </label>
          </div>

          <div>
            <button onClick={add}> Add</button>
          </div>
        </form>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <img src={item.photo.replace(/^"(.*)"$/, "$1")} />
              <span>{item.name.replace(/^"(.*)"$/, "$1")}</span>
              <span>{item.category.replace(/^"(.*)"$/, "$1")}</span>
            </li>
          ))}
        </ul>
        {data && data.length > 0
          ? data.map((item) => {
              <div>{item.name}</div>;
            })
          : "loading..."}
      </div>
    </>
  );
}

export default App;
