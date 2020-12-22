import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { sort_by_title } from '../helper';

class BookShelf extends Component {
	static propType = {
		shelfBooks: PropTypes.array.isRequired,
		bookShelves: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>My Bookcase</h1>
				</div>
				<div className="list-books-content">
					{this.props.bookShelves.map((shelf) => {
						return (
							<div key={shelf.value} className="bookshelf">
								<h2 className="bookshelf-title">{shelf.label}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{this.props.shelfBooks
											.sort(sort_by_title)
											.filter((book) => book.shelf === shelf.value)
											.map((book) => (
												<Book
													key={book.id}
													book={book}
													shelf={book.shelf}
													shelfName={shelf.label}
													changeShelf={this.props.changeShelf}
												/>
											))}
									</ol>
								</div>
							</div>
						);
					})}
				</div>
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
			</div>
		);
	}
}

export default BookShelf;
