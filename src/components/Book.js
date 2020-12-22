import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		changeShelf: PropTypes.func,
	};

	updateBook(shelf, shelfName) {
		this.props.changeShelf(this.props.book, shelf, shelfName);
	}

	render() {
		const { book } = this.props;

		return (
			<li key={book.id}>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${
									book.imageLinks !== undefined
										? book.imageLinks.smallThumbnail
										: ''
								})`,
							}}
						></div>
						<div className="book-shelf-changer">
							<select
								value={book.shelf || 'none'}
								onChange={(e) =>
									this.updateBook(
										e.target.value,
										e.target.options[e.target.selectedIndex].text
									)
								}
							>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">
						{book.authors !== undefined
							? book.authors.join(', ')
							: book.authors}
					</div>
				</div>
			</li>
		);
	}
}

export default Book;
