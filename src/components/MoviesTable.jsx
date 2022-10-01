import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/Like";
import Table from "./common/Table";
import auth from '../services/AuthService';
class MoviesTable extends Component {
  columns = [
    {
      column: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>
          {movie.name}
          {movie.title}
        </Link>
      ),
    },
    { column: "genre.name", label: "Genre" },
    { column: "numberInStock", label: "Stock" },
    { column: "dailyRentalRate", label: "Rental" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        <i className="fa fa-trash"></i>
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrrentUser();
    if(user && user.is_admin){
      this.columns.push(this.deleteColumn)
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
