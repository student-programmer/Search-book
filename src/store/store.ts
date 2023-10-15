import { makeAutoObservable } from 'mobx';
import { Book } from '../type/type';

class BookStore {
	query: string = '';
	books: Book[] = [];
	categoryFilter: string = 'all'; // Добавлено свойство для хранения текущей категории
	sortFilter: string = 'relevance'; // Добавлено свойство для хранения текущей сортировки

	constructor() {
		makeAutoObservable(this);
	}

	setQuery = (newQuery: string) => {
		this.query = newQuery;
	};

	setBooks = (newBooks: Book[]) => {
		this.books = newBooks;
	};

	setCategoryFilter = (newCategory: string) => {
		this.categoryFilter = newCategory;
	};

	setSortFilter = (newSort: string) => {
		this.sortFilter = newSort;
	};

	getBookById(bookId: string) {
		return this.books.find(book => book.id === bookId);
	}
}

export const store = new BookStore();
