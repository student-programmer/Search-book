
import { makeAutoObservable } from 'mobx';

interface Book {
	id: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		description?: string;
		imageLinks?: {
			thumbnail: string;
		};
	};
}

class BookStore {
	query: string = '';
	books: Book[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setQuery = (newQuery: string) => {
		this.query = newQuery;
	};

	setBooks = (newBooks: Book[]) => {
		this.books = newBooks;
	};
}

export const store = new BookStore();
