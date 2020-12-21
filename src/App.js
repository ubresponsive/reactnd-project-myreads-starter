import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class BooksApp extends React.Component {
	static defaultProps = {
		shelves: [
			{
				value: 'currentlyReading',
				label: 'Currently Reading',
			},
			{
				value: 'wantToRead',
				label: 'Want to Read',
			},
			{
				value: 'read',
				label: 'Read',
			},
		],
	};

	changeShelf = (book, shelf, shelfName) => {
		BooksAPI.update(book, shelf).then(() => {
			book.shelf = shelf;
			this.setState((state) => ({
				books: state.books.filter((b) => b.id !== book.id).concat([book]),
			}));
			let successMsg;
			shelfName === 'None'
				? (successMsg = 'book has been removed from your bookcase')
				: (successMsg = 'book has moved to "' + shelfName + '"');
			toast.success(successMsg);
		});
	};

	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		books: [],
		loading: true,
	};

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({
				books,
				loading: false,
			});
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					<div className="topLoader">
						<h1 className="loadertext">LOADING</h1>
					</div>
					<div className="loader">
						<div className="loader__bar"></div>
						<div className="loader__bar"></div>
						<div className="loader__bar"></div>
						<div className="loader__bar"></div>
						<div className="loader__bar"></div>
						<div className="loader__ball"></div>
					</div>
				</div>
			);
		}

		return (
			<div className="app">
				<ToastContainer
					position="top-right"
					hideProgressBar={false}
					newestOnTop={true}
				/>
				{this.state.showSearchPage ? (
					<div className="search-books">
						<div className="search-books-bar">
							<button
								className="close-search"
								onClick={() => this.setState({ showSearchPage: false })}
							>
								Close
							</button>
							<div className="search-books-input-wrapper">
								{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
								<input type="text" placeholder="Search by title or author" />
							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>
				) : (
					<div className="parent">
						<Route
							exact
							path="/"
							render={() => (
								<BookShelf
									shelfBooks={this.state.books}
									bookShelves={this.props.shelves}
									changeShelf={this.changeShelf}
								/>
							)}
						/>

						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<div className="open-search">
								<button onClick={() => this.setState({ showSearchPage: true })}>
									Add a book
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default BooksApp;
