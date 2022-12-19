import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../component/hooks/useAuth";

export default function PrivateRoute() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // console.log(user);
  if(!token) {
    return <Navigate to={"/login"}  />;
  }else  return <Outlet></Outlet>;
 
  
}
