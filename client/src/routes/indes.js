import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as Pages from '../pages';

export const RoutingApp = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/links" exact>
					<Pages.LinksPage />
				</Route>
				<Route path="/create" exact>
					<Pages.CreatePage />
				</Route>
				<Route path="/detail/:id">
					<Pages.DetailPage />
				</Route>
				<Redirect to="/create" />
			</Switch>
		);
	}

	return (
		<Switch>
			<Route path="/" exact>
				<Pages.AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};
