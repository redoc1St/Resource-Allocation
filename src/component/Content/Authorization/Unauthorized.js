import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../../../App";
import useAuth from "../../hooks/useAuth";

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { state } = useLocation();
  const { user } = useAuth();
  // useEffect = () => {
    if (user?.UserType === ROLES.ADMIN) {
      navigate(-1)
    }
  // };

  return (
    <div>
      <section>
        <h1>Unauthorized</h1>
        <p style={{ fontSize: "20px", color: "red" }}>
          You do not have access to the requested page. Only{" "}
          {state?.allowedRoles.map((item) => {
            return "[" + item + "] ";
          })}{" "}
          have permission to access this page
        </p>
        <div className="flexGrow">
          <button onClick={goBack}>Go back</button>
        </div>
      </section>
    </div>
  );
}
