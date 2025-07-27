import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Study from "./pages/Study";
const Dashboard = () => <h1>📊 Dashboard (Coming Soon)</h1>;
const Profile = () => <h1>👤 Profile (Coming Soon)</h1>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
  path="/study"
  element={
    <PrivateRoute>
      <Study />
    </PrivateRoute>
  }
/>
    </Routes>
  );
}

export default App;
