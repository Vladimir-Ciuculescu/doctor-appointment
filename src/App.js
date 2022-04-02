import React from "react";
import { Box } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { CssBaseline } from "@mui/material";
import LoginDoctor from "./pages/LoginDoctor";
import RegisterDoctor from "./pages/RegisterDoctor";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import { useSelector } from "react-redux";
import LoginOptions from "./components/LoginOptions";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import SignOutModal from "./components/SignOutModal";
import SearchDoctorPage from "./pages/SearchDoctorPage";
import ApppointmentStatusPage from "./pages/AppointmentStatusPage";
import DoctorDetails from "./pages/DoctorDetailsPage";

const App = () => {
  const { user, userType } = useSelector((state) => state.userReducer);

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
            user ? (
              <Navigate
                replace
                to={userType === "pacient" ? "/home" : "/schedule"}
              />
            ) : (
              <LoginOptions />
            )
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
          path="/doctor-details"
          element={
            <ProtectedRoute>
              <DoctorDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
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
        <Route
          exact
          path="/appointment-status"
          element={
            <ProtectedRoute>
              <ApppointmentStatusPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
