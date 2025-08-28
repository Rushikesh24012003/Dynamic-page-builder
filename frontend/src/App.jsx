import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AdminPageBuilder from "./pages/AdminPageBuilder";
import DynamicPage from "./pages/DynamicPage";
import useAuth from "./hooks/useAuth";
import HomePage from "./pages/HomePage";

function App() {
  const { token, role } = useAuth();

  if (!token) return <Login />;

  return (
    
    <>
       
        <Routes>
      <Route path="/" element={<Layout />}>
        {/* Dashboard */}
        <Route index element={<HomePage />} />
        

        {/* Admin-only route */}
        {role?.toLowerCase() === "admin" && (
          <Route path="admin" element={<AdminPageBuilder />} />
        )}

        {/* Dynamic pages */}
        <Route path="page/:table" element={<DynamicPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
