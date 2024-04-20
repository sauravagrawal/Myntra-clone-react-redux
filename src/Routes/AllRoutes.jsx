import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import CartPage from "../Pages/CartPage";
import LoginPage from "../Pages/LoginPage";
import MensPage from "../Pages/MensPage";
import Details from "../Component/Details/Details";
const AllRoutes = () => {
  return (
    <Routes>
      <Route extact path="/" element={<Home />} />
      <Route extact path="/men" element={<MensPage />} />
      <Route extact path="/singlemen/:id" element={<Details />} />
      <Route extact path="/cart" element={<CartPage />} />
      <Route extact path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AllRoutes;
