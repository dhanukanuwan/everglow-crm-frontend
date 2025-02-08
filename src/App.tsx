import MetaTags from './partials/MetaTags';
import './styles/main.scss';
import Login from './templates/Login';
import { Routes, Route } from 'react-router';
import Dashboard from './templates/Dashboard';
import NotFound from './templates/NotFound';
import ProtectedRoute from './templates/ProtectedRoute';

const App = () => {

	return(
		<div className="everglow-crm-main">
			<MetaTags />

			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route index element={<Dashboard />} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);

}

export default App;
