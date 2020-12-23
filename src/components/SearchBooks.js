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
		searching: false,
	};

	handleInputChange = debounce((keyword) => {
		if (!keyword) {
			this.setState({ books: [] });
			this.setState({ query: '' });
		} else {
			this.searchBooks(keyword);
		}
	}, 300);

	async searchBooks(query) {
		this.setState({ searching: true });
		this.setState({ query: query.trim() });

		try {
			const response = await BooksAPI.search(query);
			const books = Array.isArray(response) ? response : [];

			books.map((book) =>
				this.props.shelfBooks
					.filter((b) => b.id === book.id)
					.map((b) => (book.shelf = b.shelf))
			);
			this.setState({ books });

			this.setState({ searching: false });
		} catch (error) {
			console.error(error);
			this.setState({ books: [] });
			this.setState({ searching: false });
		}
	}

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

SearchBooks.propTypes = {
	shelfBooks: PropTypes.array.isRequired,
	changeShelf: PropTypes.func.isRequired,
};

export default SearchBooks;
