import React from 'react';
import Joi from 'joi-browser';
import { WithRouter } from '../utils/WithRouter';
import Form from './common/Form';
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {

  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  }

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ genres });
  }

  schema = {
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(1).max(100).required().label('Number in Stock'),
    dailyRentalRate: Joi.number().min(1).max(10).required().label('Rental Rate'),
  };

  doSubmit = () => {

    const { title, genreId, numberInStock, dailyRentalRate } = this.state.data;

    saveMovie({
      title: title,
      genreId: genreId,
      numberInStock: numberInStock,
      dailyRentalRate: dailyRentalRate
    });

    this.props.navigate('/movies')

  }

  render() {
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col">
          <h2>Add a New Movie</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('title', 'Title')}
            {this.renderDropdown('genreId', 'Genres', this.state.genres)}
            {this.renderInput('numberInStock', 'Number in Stock', 'number')}
            {this.renderInput('dailyRentalRate', 'Rental Rate', 'number')}
            {this.renderButton('Save')}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}
export default WithRouter(MovieForm);