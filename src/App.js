import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  HomePage,
  AboutPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
