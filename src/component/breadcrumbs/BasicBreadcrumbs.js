import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const breadcrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    return (
      <div role="presentation" >
      
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" style={{color:'inherit'}} to={`/${pathnames}`}>
            {pathnames}
          </Link>
         
          {/* <Typography color="text.primary">Project</Typography> */}
        </Breadcrumbs>
      </div>
    );
  };

  return <>{breadcrumbView()}</>;
}
