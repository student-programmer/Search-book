// src/App.tsx
import React, { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Book from './components/Book/Book';
import { useMobXStore } from './store/context';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

const App: React.FC = observer(() => {
	const store = useMobXStore();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		store.setQuery(event.target.value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await axios.get(
				'https://www.googleapis.com/books/v1/volumes?q=' +
					store.query +
					'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' +
					'&maxResults=40'
			);
			store.setBooks(response.data.items || []);
		} catch (error) {
			console.error('Error fetching books:', error);
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<h1>Google Books Search</h1>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							value={store.query}
							onChange={handleChange}
							placeholder='Search for books...'
						/>
						<button type='submit'>Search</button>
					</form>
				</Col>
			</Row>
			<Row>
				{store.books.map(book => (
					<Col key={book.id} xs={12} sm={6} md={4}>
						<Book
							id={book.id}
							title={book.volumeInfo.title}
							img={book.volumeInfo.imageLinks}
							authors={book.volumeInfo.authors}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
});

export default App;
