import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Switch, Route, Link } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import SearchBooks from './components/SearchBooks';
import Error404 from './components/404';
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

	state = {
		books: [],
		query: '',
		loading: true,
	};

	changeShelf = (book, shelf, shelfName) => {
		BooksAPI.update(book, shelf)
			.then(() => {
				book.shelf = shelf;
				this.setState((state) => ({
					books: state.books.filter((b) => b.id !== book.id).concat([book]),
				}));
				let successMsg;
				shelfName === 'None'
					? (successMsg = 'book has been removed from your bookcase')
					: (successMsg = 'book has moved to "' + shelfName + '"');
				toast.success(successMsg);
			})
			.catch((error) => {
				console.error(error);
			});
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
				// TODO: Move this into a separate component
				<div>
					<div className="topLoader">
						<h2 className="loadertext">LOADING</h2>
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
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<div>
								<BookShelf
									shelfBooks={this.state.books}
									bookShelves={this.props.shelves}
									changeShelf={this.changeShelf}
								/>
								<div className="open-search">
									<Link to="/search">Add a book</Link>
								</div>
							</div>
						)}
					/>
					<Route
						exact
						path="/search"
						render={() => (
							<SearchBooks
								shelfBooks={this.state.books}
								changeShelf={this.changeShelf}
							/>
						)}
					/>
					<Route component={Error404} />
				</Switch>
			</div>
		);
	}
}

export default BooksApp;
