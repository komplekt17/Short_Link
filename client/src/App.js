import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { RoutingApp } from './routes';
import { useAuth } from './custom-hooks';
import { AuthContext } from './сontext';
import { Navbar, Loader } from './components';
import 'materialize-css';
import './styles/App.css';

const App = () => {
	const { login, logout, userId, token, ready } = useAuth();

	const isAuthenticated = !!token; // !! приведение к булеву типу
	const routes = RoutingApp(isAuthenticated);

	if (!ready) {
		return <Loader />;
	}

	return (
		<div className="App">
			<AuthContext.Provider
				// получаем данные из AuthContext
				value={{ login, logout, userId, token, isAuthenticated }}
			>
				<Router>
					{isAuthenticated ? <Navbar /> : ''}
					{routes}
				</Router>
			</AuthContext.Provider>
		</div>
	);
};

export default App;
