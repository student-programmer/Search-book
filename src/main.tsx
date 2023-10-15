import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MobXProvider } from './store/context.tsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookPage from './page/BookPage/BookPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MobXProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/detail/:bookId' element={<BookPage />} />
				</Routes>
			</BrowserRouter>
		</MobXProvider>
	</React.StrictMode>
);
