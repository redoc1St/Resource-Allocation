import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../App";
//sử dụng cơ chế custom Hook
function useAuth() {
  const {
    setAccount,
    account,
    onclickShowLeft,
    setOnclickShowLeft,
    moreRow,
    setMoreRow,
    valueInput,
    setValueInput,
    quantity,
    setQuantity,
    statusCand,
    setStatusCand,login,logout,user
  } = React.useContext(AuthContext); //lấy từ app.js
  const isAuthenticated = !!account;
  return {
    setAccount,
    isAuthenticated,
    account,
    setOnclickShowLeft,
    onclickShowLeft,
    moreRow,
    setMoreRow,
    valueInput,
    setValueInput,
    quantity,
    setQuantity,
    statusCand,
    setStatusCand,login,logout,user
  };
}
export default useAuth;
