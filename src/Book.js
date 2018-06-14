import React, { PureComponent  } from 'react';
import * as BooksAPI from './BooksAPI';

export default class Book extends PureComponent  {

    async moveBook(book, to) {
        await BooksAPI.update(book, to);

        if (this.props.move) {
            this.props.move(book, book.shelf, to);
        } else if(this.props.refresh) {
            this.props.refresh();
        }

        book.shelf = to;

    }

    render() {

		let { authors, imageLinks, shelf: actualShelf } = this.props.info;

        if (authors) {
            authors = authors.join(', ');
        } else {
            authors = this.props.info.publisher;
        }

        if (!actualShelf) {
            actualShelf = 'none';
        }

		let properties = { width: 128, height: 193 };
		
		if (typeof imageLinks !== 'undefined') {
			properties.backgroundImage = `url("${imageLinks.thumbnail}")`;
		}

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={properties}></div>
                    <div className="book-shelf-changer">
                        <select value={actualShelf} onChange={(e) => { this.moveBook(this.props.info, e.target.value) }}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.info.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    }

}