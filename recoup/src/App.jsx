import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import NewProduct from "./components/NewProduct/NewProduct";
import Header from "./components/Header/Header";
import SearchPage from "./pages/Search";
import ProductPage from "./pages/ProductPage";
import UserHome from "./pages/UserHome/UserHome";
// import UserHome from "./pages/UserHome";
import Login from "./pages/LoginPage";
import NewProductPage from "./pages/NewProduct";
import Authorize from "./Authorize";
import SignUp from "./components/SignUp/SignUp";
import { SnackbarProvider } from "notistack";

const userUrl = "/user";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const fetchUserData = async (userId) => {
    try {
      const { data } = await axios.get(`${API_URL}${userUrl}/${userId}`);
      setUser(data);
    } catch (error) {
      console.log("Error getting user data", error);
    }
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      dense
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/home" element={<UserHome />} />
          <Route
            path="/signup"
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/rent"
            element={
              <Authorize>
                <SearchPage />
              </Authorize>
            }
          />
          <Route
            path="/rent/:productId"
            element={
              <Authorize>
                <ProductPage />
              </Authorize>
            }
          />
          <Route
            path="/earn"
            element={
              <Authorize>
                <NewProduct />
              </Authorize>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <Authorize>
                <UserHome />
              </Authorize>
            }
          />
          {/* <Route path="/test" element={<EditUser />} /> */}
          <Route
            path="/newproduct"
            element={
              <Authorize>
                <NewProductPage />
              </Authorize>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
