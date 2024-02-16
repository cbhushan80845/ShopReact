import "./App.css";
import React from "react";
import AddItems from "./compo/AddItems";
import ExitingItem from "./compo/ExitingItem";
import EditItem from "./compo/EditItem";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetAllItems from "./Common/GetAllItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/existing-item" element={<ExitingItem />} />
        <Route path="/add-item" element={<AddItems />} />
        <Route path="/all-item" element={<GetAllItems />} />
        <Route path="/edit-item" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
