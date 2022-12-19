import * as React from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const breadcrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            style={{ color: "inherit" }}
            to={`/${pathnames}`}
          >
            {pathnames}
          </Link>
        </Breadcrumbs>
      </div>
    );
  };

  return <>{breadcrumbView()}</>;
}
