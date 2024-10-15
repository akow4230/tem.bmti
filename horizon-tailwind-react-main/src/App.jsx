import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import DeanLayout from "layouts/dean"
import StudentLayout from "layouts/student";
import AuthLayout from "layouts/auth";
import Login from "./views/student/login/Login"
import LoginAdmin from "./config/login/Login"
import IconsAll from  './IconsAll'
import SuperAdminLayout from "layouts/superadmin"
import ErrorPage from "./404/404"
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="dean/*" element={<DeanLayout />} />
      <Route path="superadmin/*" element={<SuperAdminLayout />} />
      <Route path="admin/login" element={<LoginAdmin/>} />
      <Route path="student/*" element={<StudentLayout />} />
      <Route path="student/login" element={<Login />} />
      <Route path="icons" element={<IconsAll />} />
      <Route path="/" element={<Navigate to="/student" replace />} />
        {/* Define the /404 route */}
        <Route path="/404" element={<ErrorPage />} />

        {/* Catch all undefined routes and redirect to /404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;
