import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

export default class Search extends Component {

    state = {
        query: '',
        searchBooks: []
    }

    async updateQuery(query) {
        this.setState({ query: query });

        if (query.trim()) {
            try {
                const books = await BooksAPI.search(query);
                this.checkList(books);
                this.setState({ searchBooks: books });
            } catch (e) {
                this.setState({ searchBooks: [] });
            }
        } else {
            this.setState({ searchBooks: [] });
        }
    }

    checkList(books) {
        const booksInList = this.props.list.read.concat(this.props.list.wantToRead.concat(this.props.list.currentlyReading));
        books.forEach((book) => {
            const existent = booksInList.find((bs) => bs.id === book.id);

            if (existent) {
                book.shelf = existent.shelf;
            }
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search..." value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map(book =>
                            ( <li key={book.id}>
								<Book info={book} refresh={this.props.refresh} />
                              </li>
							))
                        }
                    </ol>
                </div>
            </div>
        );
    }

}