import React, { Component } from "react";
import _ from 'lodash';
import { Link } from "react-router-dom";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import SearchBox from "./common/SearchBox";
import { paginate } from './../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
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
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1, });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  }

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
  }

  getPagedData = () => {
    const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies, searchQuery } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(movie =>
        movie.genre._id === selectedGenre._id)

    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>No movies</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary" to="/movies/new">
            Add Movie
          </Link>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          />
          <p className="mt-3">Showing {totalCount} movies in the database.</p>
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
