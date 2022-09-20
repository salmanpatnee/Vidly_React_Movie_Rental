import React, { Component } from 'react';
import Joi from 'joi-browser';
import { WithRouter } from '../utils/WithRouter';
import Form from './common/Form';
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {

    state = {
        id: "",
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
        errors: {},
        genres: [],
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(1).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(1).max(10).required().label('Rental Rate'),
    };

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ genres });

        const id = this.props.params.id;
        if (!id) return;

        const movie = getMovie(id);
        if (!movie) return this.props.navigate('/not-found', { replace: true });

        this.setState({ data: this.mapToViewModel(movie) });
    }

    mapToViewModel = movie => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = () => {

        saveMovie(this.state.data);

        this.props.navigate('/movies')
    }

    renderPageTitle = () => {
        const { data: movie } = this.state;
        return (movie._id === "") ? <h2>Add a New Movie</h2> : <h2>Movie - {movie.title}</h2>
    }

    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col">
                    {this.renderPageTitle()}
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('title', 'Title')}
                        {this.renderDropdown('genreId', 'Genres', this.state.genres, this.state.data.genreId)}
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