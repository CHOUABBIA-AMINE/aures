import './index.css';

import React 					from 'react';
import ReactDOM 				from 'react-dom/client';

import { BrowserRouter } 		from 'react-router-dom';

import Aures 					from './core/aures';

ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
).render(
	<BrowserRouter>
		<React.StrictMode>
			<Aures />
		</React.StrictMode>
	</BrowserRouter>
);