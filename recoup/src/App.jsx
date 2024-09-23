import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import UserProfile from "./components/UserProfile/UserProfile";
import NewProduct from "./components/NewProduct/NewProduct";
import Header from "./components/Header/Header";
import SearchPage from "./pages/Search";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/rent" element={<SearchPage />} />
        <Route path="/rent/:rentId" element={<ProductPage />} />
        <Route path="/earn" element={<NewProduct />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
