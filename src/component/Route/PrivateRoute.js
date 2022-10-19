import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../component/hooks/useAuth";

export default function PrivateRoute() {
  const { account } = useAuth();
  if(!account) {
    return <Navigate to={"/login"}  />;
  }else  return <Outlet></Outlet>;
 
  
}
