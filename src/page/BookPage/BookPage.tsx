import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useMobXStore } from '../../store/context';
import { Book } from '../../type/type';
import { Card, Col, Row } from 'react-bootstrap';
import b from './BookPage.module.css';

interface BookDetailProps {}

const BookDetail: React.FC<BookDetailProps> = observer(() => {
	const { bookId } = useParams<{ bookId?: string | undefined }>();
	const store = useMobXStore();
	const [book, setBook] = useState<Book | undefined>();

	useEffect(() => {
		if (bookId !== undefined) {
			const book = store.getBookById(bookId);
			setBook(book);
		}
	}, [store, bookId]);

	if (!book) {
		return <div>Loading...</div>;
	}

	return (
		<Row className={b.rows}>
			<Col md={4}>
				<Card>
					<Card.Img
						variant='top'
						src={book.volumeInfo.imageLinks?.thumbnail}
						alt=''
					/>
				</Card>
			</Col>
			<Col md={8}>
				<Card>
					<Card.Body>
						<Card.Title>{book.volumeInfo.title}</Card.Title>
						<Card.Text>
							Authors: {book.volumeInfo.authors?.join(', ')}
						</Card.Text>
						<Card.Text>Description: {book.volumeInfo.description}</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
});

export default BookDetail;
