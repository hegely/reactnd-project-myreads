import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

export default class Search extends Component {
    state = { ResultResults: [] }
	
componentDidMount () {
    BooksAPI.getAll().then((ResultResults) => {
		this.setState( {ResultResults} )
    })
}
       
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
	}

    search(e) {
		if (e.target.value !== '') {
			BooksAPI.search(e.target.value).then((ResultResults) => {
				if (!ResultResults || ResultResults.error) {
					this.setState({ ResultResults: [] })
					return
				}
				
				ResultResults = ResultResults.map((book) => {				
					if (this.props.books.find(c => c.id === book.id)) {
						book.shelf = this.props.books.find(c => c.id === book.id).shelf;					
					} else {
						book.shelf = 'none'
					}
					return book;
				});
				this.setState({ResultResults});
			});
		} else {
		this.setState({ResultResults: []})
		}
    }
	
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search..." onChange={this.search}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.ResultResults.map(book => (
                            <li key={book.id}>
                                <Book book={book} changeState={this.props.changeState}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
