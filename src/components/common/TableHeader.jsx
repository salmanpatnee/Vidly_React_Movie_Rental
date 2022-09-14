import React, { Component } from 'react';

class TableHeader extends Component {

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

        const { columns } = this.props;

        return (
            <thead>
                <tr>
                    {columns.map(column => (
                        <th
                            onClick={() => this.raiseSort(column.column)}
                            scope="col"
                            key={column.column || column.key}
                        >
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;