import React from "react";

import { useParams, useNavigate } from "react-router-dom";

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-3">Movie - {id}</h1>
      <button onClick={() => navigate("/")} className="btn btn-primary">
        Save
      </button>
    </>
  );
};

export default Movie;
