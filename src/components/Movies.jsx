import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/MovieService";
import { getGenres } from "../services/GenreService";

import MoviesTable from "./MoviesTable";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
<<<<<<< HEAD
import SearchBox from "./common/SearchBox";
import { paginate } from './../utils/paginate';
=======
import { paginate } from "./../utils/paginate";
>>>>>>> b1d98d786f836130fa43cf49fb4a1494ff6091ea

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { column: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ genres, movies });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id)
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

<<<<<<< HEAD
  handleGenreSelect = genre => {
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1, });
  }
=======
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
>>>>>>> b1d98d786f836130fa43cf49fb4a1494ff6091ea

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (e) => {
    let query = e.target.value.toLowerCase();

    const movies = this.state.movies.filter((m) =>
      Object.values(m).some((val) => val.includes(query))
    );

    console.log(movies);
  };
  get handleSearch() {
    return this._handleSearch;
  }
  set handleSearch(value) {
    this._handleSearch = value;
  }

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
  }

  getPagedData = () => {
<<<<<<< HEAD
    const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies, searchQuery } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(movie =>
        movie.genre._id === selectedGenre._id)
=======
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;
>>>>>>> b1d98d786f836130fa43cf49fb4a1494ff6091ea

    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
<<<<<<< HEAD
    const { pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery } = this.state;
=======
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;
>>>>>>> b1d98d786f836130fa43cf49fb4a1494ff6091ea

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
          <div className="form-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search Movie"
              onChange={this.handleSearch}
            ></input>
          </div>
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
