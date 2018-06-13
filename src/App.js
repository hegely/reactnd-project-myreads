import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import List from './List';
import Search from './Search';
import './App.css'

export default class BooksApp extends React.Component {

	state = {
		list: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		}
	}
	
	async refreshList() {
		const booksInMyList = await BooksAPI.getAll();

		this.setState({
			list: {
				currentlyReading: booksInMyList.filter(book => book.shelf === 'currentlyReading'),
				wantToRead: booksInMyList.filter(book => book.shelf === 'wantToRead'),
				read: booksInMyList.filter(book => book.shelf === 'read')
			}
		});
	}

	componentDidMount() {
		this.refreshList();
	}

	async move(book, fromShelf, toShelf) {

		try {
			this.setState((previous) => {
				previous.list[`${fromShelf}`] = previous.list[`${fromShelf}`].filter(remove => book.id !== remove.id);

			if (toShelf !== 'none') {
				previous.list[`${toShelf}`] = previous.list[`${toShelf}`].concat(book);
			}

			book.shelf = toShelf;
			return previous;
			});

		} catch (e) {
			console.error(e);
		}
	}

	render() {

		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<List list={this.state.list} move={this.move.bind(this)} />
				)} />
				<Route path="/search" render={() => (
					<Search list={this.state.list} refresh={this.refreshList.bind(this)} />
				)} />
			</div>
		);
	}
}
