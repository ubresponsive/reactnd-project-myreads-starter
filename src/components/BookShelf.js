import React from 'react';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { sort_by_title } from '../helper';

const BookShelf = (props) => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>My Bookcase</h1>
			</div>
			<div className="list-books-content">
				{props.bookShelves.map((shelf) => {
					return (
						<div key={shelf.value} className="bookshelf">
							<h2 className="bookshelf-title">{shelf.label}</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{props.shelfBooks
										.sort(sort_by_title)
										.filter((book) => book.shelf === shelf.value)
										.map((book) => (
											<Book
												key={book.id}
												book={book}
												shelf={book.shelf}
												shelfName={shelf.label}
												changeShelf={props.changeShelf}
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
};

BookShelf.propTypes = {
	shelfBooks: PropTypes.array.isRequired,
	bookShelves: PropTypes.array.isRequired,
	changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
