import React from "react";
import { Box } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { CssBaseline } from "@mui/material";
import LoginDoctor from "./pages/LoginDoctor";
import RegisterDoctor from "./pages/RegisterDoctor";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import LoginOptions from "./components/LoginOptions";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import SignOutModal from "./components/SignOutModal";
import SearchDoctorPage from "./pages/SearchDoctorPage";

const App = () => {
  const user = useSelector((state) => state.userReducer);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Menu />
      </Box>
      <SignOutModal />
      <Routes>
        <Route
          exact
          path="/"
          element={
            user.user ? <Navigate replace to="/home" /> : <LoginOptions />
          }
        />

        <Route exact path="/login" element={<LoginDoctor />} />
        <Route exact path="/register" element={<RegisterDoctor />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <ProtectedRoute>
              <SearchDoctorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
