import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
        data: { title: "", genre_id: "", numberInStock: "", dailyRentalRate: "" },
        errors: {},
        genres: [],
    }

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ genres });
    }

    schema = {
        title: Joi.string().required().label('Title'),
        genre_id: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(1).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(1).max(10).required().label('Rental Rate'),
    };

    doSubmit = () => {
        // saveMovie({})
        // redirect to movies page

    }

    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col">
                    <h2>Add a New Movie</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('title', 'Title')}
                        {this.renderDropdown('genre_id', 'Genres', this.state.genres)}
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

export default MovieForm;