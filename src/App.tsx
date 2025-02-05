import { useState } from 'react';
import MetaTags from './partials/MetaTags';
import './styles/main.scss';
import Login from './templates/Login';
import { Routes, Route } from 'react-router';
import Dashboard from './templates/Dashboard';
import NotFound from './templates/NotFound';


const App = () => {

	return(
		<div className="everglow-crm-main">
			<MetaTags />

			<Routes>
				<Route index element={<Dashboard />} />
				<Route path="login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);

}

export default App;
