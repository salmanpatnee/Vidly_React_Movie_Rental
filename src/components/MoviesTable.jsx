import React, { Component } from 'react';
import Like from "./common/Like";
import Table from "./common/Table";

class MoviesTable extends Component {

    columns = [
        { column: 'title', label: 'Title' },
        { column: 'genre.name', label: 'Genre' },
        { column: 'numberInStock', label: 'Stock' },
        { column: 'dailyRentalRate', label: 'Rental' },
        {
            key: 'like', content: movie => (
                <Like
                    liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            )
        },
        {
            key: 'delete', content: movie => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm"
                >
                    <i className="fa fa-trash"></i>
                </button>
            )
        }
    ]

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