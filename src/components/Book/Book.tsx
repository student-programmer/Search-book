import React from 'react';
import b from './Book.module.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';


interface BookProps {
	id: string;
	title: string;
	img: { thumbnail: string } | undefined;
	authors: string[] | undefined;
}

const Book: React.FC<BookProps> = observer(({ id, title, img, authors }) => {
	return (
		<div className={b.wrapper} key={id}>
			<Card style={{ width: '18rem' }}>
				<Card.Img variant='top' src={img?.thumbnail} />
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{authors && authors.join(', ')}</Card.Text>
					<Button variant='primary'>
						{' '}
						<Link to={'/detail/' + id}>Go</Link>
					</Button>{' '}
				</Card.Body>
			</Card>
		</div>
	);
});

export default Book;
