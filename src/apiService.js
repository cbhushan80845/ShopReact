import axios, { AxiosHeaders } from "axios";

const BASE_URL = "http://localhost:8080";

export const addItem = async (data) => {
  //e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", JSON.stringify(data["name"]), {
  //     type: "application/json",
  //   });
  //   //   formData.append("name", data["name"]);
  //   formData.append("name", data.name);
  //   formData.append("category", data.category);
  //   formData.append("status", data.status);
  //   formData.append("photo", data.photo);

  try {
    await axios.post(
      "http://localhost:8080/addItem",
      { params: data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(error);
    alert("faild");
  }
};

export const getItem = async () => {
  try {
    //const response = await axios.get(API_URL);
    //const result = await api.get("/items");
    const result = await axios.get("http://localhost:8080/items");
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export async function deleteItem(id) {
  // try {
  //     const result = await api.delete(${id}), {
  //         headers: AxiosHeaders(),
  //     });
  //     return result.data;
  // } catch (error) {
  //     throw new Error("delete not completed");
  // }
}
