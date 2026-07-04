import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<section className="sect-404">
			<div className="container">
				<br />
				<br />
				<br />

				<div className="title-sect center">
					<h1 className="h1-title">404 not found</h1>

					<div className="btn-more-wrap center">
						<Link to="/" className="btn">
							Go to home
						</Link>
					</div>
				</div>

				<br />
				<br />
				<br />
			</div>
		</section>
	);
}
