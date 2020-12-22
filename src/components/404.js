import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
	return (
		<div className="centered">
			<div className="list-books-title">
				<h1>Oopsie - something went wrong here</h1>
				<h3>
					<Link to="/">Take me Home</Link>
				</h3>
			</div>
		</div>
	);
};

export default Error404;
