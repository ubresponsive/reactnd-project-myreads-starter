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
	state = {
		books: [],
		loading: true,
	};

	changeShelf = async (book, shelf, shelfName) => {
		try {
			await BooksAPI.update(book, shelf);
			book.shelf = shelf;
			this.setState((state) => ({
				books: state.books.filter((b) => b.id !== book.id).concat([book]),
			}));
			let successMsg;
			shelfName === 'None'
				? (successMsg = 'book has been removed from your bookcase')
				: (successMsg = 'book has moved to "' + shelfName + '"');
			toast.success(successMsg);
		} catch (error) {
			console.error(error);
			toast.error('Oopsie, Houston we have a problem');
		}
	};

	async componentDidMount() {
		const books = await BooksAPI.getAll();
		this.setState({
			books,
			loading: false,
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
					<Route exact path="/">
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
					</Route>
					<Route exact path="/search">
						<SearchBooks
							shelfBooks={this.state.books}
							changeShelf={this.changeShelf}
						/>
					</Route>
					<Route component={Error404} />
				</Switch>
			</div>
		);
	}
}

BooksApp.defaultProps = {
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

export default BooksApp;
