import React, { useState, useEffect } from "react";
import Joi from 'joi-browser';
import { useParams, useNavigate } from "react-router-dom";
import { getMovie } from "../services/fakeMovieService";

const Movie = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        console.log(id);
        setMovie(getMovie(id));
    });

    const navigate = useNavigate();

    return (
        <>
            <h1 className="mb-3">Movie - {movie.title}</h1>

            <button onClick={() => navigate("/")} className="btn btn-primary">
                Save
            </button>
        </>
    );
};

export default Movie;
