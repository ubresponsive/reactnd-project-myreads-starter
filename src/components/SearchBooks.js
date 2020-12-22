import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from '../components/Book';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { sort_by_title } from '../helper';

class SearchBooks extends Component {
	state = {
		query: '',
		books: [],
	};

	static propType = {
		shelfBooks: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired,
	};

	handleInputChange = debounce((keyword) => {
		!keyword ? this.setState({ books: [] }) : this.searchBooks(keyword);
	}, 300);

	searchBooks = (query) => {
		!query
			? this.setState({ query: '', books: [] })
			: this.setState({ query: query.trim() });
		BooksAPI.search(query)
			.then((books) => {
				if (books.length) {
					books.map((book) =>
						this.props.shelfBooks
							.filter((b) => b.id === book.id)
							.map((b) => (book.shelf = b.shelf))
					);
					this.setState({ books });
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={(e) => this.handleInputChange(e.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.books.sort(sort_by_title).map((book) => (
							<Book
								key={book.id}
								book={book}
								shelf={book.shelf}
								changeShelf={this.props.changeShelf}
							/>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBooks;
