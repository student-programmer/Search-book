import React from 'react';
import b from './Book.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


interface BookProps {
	id: string;
	title: string;
	img: { thumbnail: string } | undefined;
	authors: string[] | undefined;
}

const Book: React.FC<BookProps> = ({ id, title, img, authors }) => {
	return (
		<div className={b.wrapper} key={id}>
				<Card style={{ width: '18rem' }}>
					<Card.Img variant='top' src={img?.thumbnail} />
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text>{authors && authors.join(', ')}</Card.Text>
						<Button variant='primary'>Go somewhere</Button>
					</Card.Body>
				</Card>
		</div>
	);
};

export default Book;
