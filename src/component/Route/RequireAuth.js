import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();
  return [user?.UserType].find((type) => allowedRoles?.includes(type)) ? (
    <Outlet />
  ) : (
    <Navigate to={"/unauthorized"} state={{allowedRoles}} replace />
  );
}
