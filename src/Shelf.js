import React, {Component} from 'react';
import Book from "./Book.js";

export default class Shelf extends Component {
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.name}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.List.map((book) => {
							return <li key={book.id}>
							<Book book={book} changeState={this.props.changeState}/>
								</li>
							})
						}
					</ol>
				</div>
			</div>
		)
	}
}