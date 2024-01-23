import React 				from 'react';
import ReactDOM 			from 'react-dom/client';

import { BrowserRouter } 	from 'react-router-dom';

import Root 				from './core/root';

import './index.css';

ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
).render(
	<BrowserRouter>
		<React.StrictMode>
			<Root />
		</React.StrictMode>
	</BrowserRouter>
);