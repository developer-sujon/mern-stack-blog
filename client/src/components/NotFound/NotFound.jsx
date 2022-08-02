import React from "react";
import { useParams } from "react-router-dom";

const NotFound = () => {
  const patch = useParams();
  return (
    <div style={{ marginTop: "150px", textAlign: "center" }}>
      {patch["*"]} this page not exist
    </div>
  );
};

export default NotFound;
