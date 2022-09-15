import React, { Component } from "react";
import _ from 'lodash';

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from './../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { column: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

    this.setState({ genres, movies: getMovies() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  }

  getPagedData = () => {
    const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;

    if (count === 0) return <p>No movies</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <h1>Genres</h1>
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h1>Movies</h1>
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>

      </div>
    );
  }
}

export default Movies;
