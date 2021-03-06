import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, changeShelf }) => (
	<li>
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${
							book?.imageLinks?.smallThumbnail ??
							'http://via.placeholder.com/128x193?text=No%20Image'
						})`,
					}}
				></div>
				<div className="book-shelf-changer">
					<select
						value={book.shelf || 'none'}
						onChange={(e) =>
							changeShelf(
								book,
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
				{book.authors ? book.authors.join(', ') : book.authors}
			</div>
		</div>
	</li>
);

Book.propTypes = {
	book: PropTypes.object.isRequired,
	changeShelf: PropTypes.func,
};

export default Book;
