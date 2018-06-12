import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import List from './List';
import Search from './Search';
import {Route} from 'react-router-dom';

export default class BooksApp extends React.Component {
	state = {
		books: [],
		showSearchPage: true,
	}
    
	componentDidMount() {
		this.listBooks(); 
	}

    listBooks() {
		BooksAPI.getAll().then(books => {
			this.setState({books: books, showSearchPage: false})
        });
	}

	constructor(props) {
		super(props);
		this.changeState = this.changeState.bind(this);
	}

    changeState(book, shelf){
        BooksAPI.update(book, shelf)
            .then(this.setState((state) => ({
                    books: state.books.map(c => {
                        while (c.title === book.title) {
                            c.shelf = shelf;
                            return c
                        } 
                            return c                        
                    }),
                   showSearchPage: false
                }))
            )
    };

    render() {
       return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <div>
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        {
                            !this.state.showSearchPage ? (
                                <List
                                    curReading={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                                    wntRead={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                                    read={this.state.books.filter((book) => book.shelf === 'read')}
                                    changeState={this.changeState}
                                />
                            ) : (
                                <div className="loading"/>
                            )
                        }
                    </div>
                )}/>

                <Route path="/search" render={({h}) => (
                    <Search changeState={this.changeState} h={h}
							books={this.state.books.filter((book) =>
								book.shelf === 'currentlyReading').concat(this.state.books.filter((book) =>
								book.shelf === 'wantToRead'),
                            this.state.books.filter((book) => book.shelf === 'read') )}
                    />

                )}/>
            </div>
        )
    }
}
