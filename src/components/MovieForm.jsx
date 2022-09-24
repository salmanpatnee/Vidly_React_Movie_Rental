import React, { Component } from "react";
import Joi from "joi-browser";
import { WithRouter } from "../utils/WithRouter";
import Form from "./common/Form";
import { getGenres } from "../services/GenreService";
import { saveMovie, getMovie } from "../services/MovieService";

class MovieForm extends Form {
  state = {
    id: "",
    data: { title: "", genre_id: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre_id: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Rental Rate"),
  };

  async getGenres() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ genres });
  }

  async getMovie() {
    try {
      const id = this.props.params.id;
      if (!id) return;
      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.navigate("/not-found", { replace: true });
    }
  }
  async componentDidMount() {
    await this.getGenres();
    await this.getMovie();
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genre_id: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.navigate("/movies");
  };

  renderPageTitle = () => {
    const { data: movie } = this.state;
    if (movie.title) {
      return <h2>Movie - {movie.title}</h2>;
    } else {
      return <h2>Add New Movie</h2>;
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col">
          {this.renderPageTitle()}
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderDropdown(
              "genre_id",
              "Genres",
              this.state.genres,
              this.state.data.genre_id
            )}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rental Rate", "number")}
            {this.renderButton("Save")}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}
export default WithRouter(MovieForm);
