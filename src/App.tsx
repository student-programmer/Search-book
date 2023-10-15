import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import Book from './components/Book/Book';
import { useMobXStore } from './store/context';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const App: React.FC = observer(() => {
	const store = useMobXStore();
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		store.setQuery(event.target.value);
	};

	const handleCategoryChange = (event: ChangeEvent<any>) => {
		store.setCategoryFilter(event.target.value);
	};

	const handleSortChange = (event: ChangeEvent<any>) => {
		store.setSortFilter(event.target.value);
	};

	const [currentPage, setCurrentPage] = useState(1);

	const loadMore = async () => {
		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${
					store.query
				}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=30&startIndex=${
					currentPage * 30
				}`
			);
			const newBooks = response.data.items || [];
			store.setBooks([...store.books, ...newBooks]);
			setCurrentPage(currentPage + 1);
		} catch (error) {
			console.error('Error fetching more books:', error);
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${store.query}&orderBy=${
					store.sortFilter
				}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=30${
					store.categoryFilter !== 'all'
						? `&subject:${encodeURIComponent(store.categoryFilter)}`
						: ''
				}`
			);
			console.log('API Response:', response.data);
			store.setBooks(response.data.items || []);
		} catch (error) {
			console.error('Error fetching books:', error);
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Col>
					<Form.Group controlId='formBasicSearch'>
						<Form.Control
							type='text'
							value={store.query}
							onChange={handleChange}
							placeholder='Search for books...'
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='formBasicCategory'>
						<Form.Control
							as='select'
							value={store.categoryFilter}
							onChange={handleCategoryChange}
						>
							<option value='all'>All Categories</option>
							<option value='art'>Art</option>
							<option value='biography'>Biography</option>
							<option value='computers'>Computers</option>
							<option value='history'>History</option>
							<option value='medical'>Medical</option>
							<option value='poetry'>Poetry</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='formBasicSort'>
						<Form.Control
							as='select'
							value={store.sortFilter}
							onChange={handleSortChange}
						>
							<option value='relevance'>Relevance</option>
							<option value='newest'>Newest</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Button variant='primary' type='submit'>
						Search
					</Button>
				</Col>
			</Form>
			<Row>
				{store.books &&
					store.books
						.filter(book => {
							if (store.categoryFilter === 'all') {
								return true;
							}
							const bookCategories = book.volumeInfo.categories || [];
							return bookCategories.includes(store.categoryFilter);
						})
						.map(book => (
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
			<div className='text-center'>
				<Button variant='primary' onClick={loadMore}>
					Load more
				</Button>
			</div>
		</Container>
	);
});

export default App;
