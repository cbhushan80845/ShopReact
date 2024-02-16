import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export const getHeader = () => {
  return {
    "Content-Type": "multipart/form-data",
  };
};

export async function addItems(photo, name, status, category) {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("status", status);
    formData.append("category", category);

    const response = await api.post("/addItem", formData, {
      "Content-Type": "multipart/form-data",
    });

    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error adding item:", error);
    return false;
  }
}

export async function getAllItems() {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching items");
  }
}

export async function deleteItem(id) {
  try {
    const result = await api.delete(`/item/${id}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`delete not completed`);
  }
}
export async function getItemById(id) {
  try {
    const result = await api.get(`/item/${id}`);

    return result.data;
  } catch (error) {
    throw new Error(`Error fetching item ${error.message}`);
  }
}
export async function updateItem(id, itemData) {
  const formData = new FormData();
  formData.append("category", itemData.category);
  formData.append("satus", itemData.status);
  formData.append("name", itemData.name);
  formData.append("photo", itemData.photo);

  const response = await api.put(`/item/update/${id}`, formData, {
    headers: getHeader(),
  });
  return response;
}
