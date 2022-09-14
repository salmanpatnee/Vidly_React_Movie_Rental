import React, { Component } from 'react';
import Like from "./common/Like";

class MoviesTable extends Component {

    raiseSort = column => {

        const sortColumn = { ...this.props.sortColumn };

        if (sortColumn.column === column) {
            sortColumn.order = (sortColumn.order === 'asc')
                ? 'desc'
                : 'asc';
        } else {
            sortColumn.column = column;
            sortColumn.order = 'asc';
        }

        return this.props.onSort(sortColumn);
    }

    render() {

        const { movies, onLike, onDelete } = this.props;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
                        <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
                        <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
                        <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like
                                    liked={movie.liked}
                                    onClick={() => onLike(movie)}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => onDelete(movie)}
                                    className="btn btn-danger btn-sm"
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default MoviesTable;