import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

export default class List extends Component {

    render() {

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf name="Currently Reading" books={this.props.list.currentlyReading} move={this.props.move} />
                        <Shelf name="Want to Read" books={this.props.list.wantToRead} move={this.props.move} />
                        <Shelf name="Read" books={this.props.list.read} move={this.props.move} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }

}