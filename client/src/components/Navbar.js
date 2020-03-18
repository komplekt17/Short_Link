import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSignOutAlt,
	faLink,
	faPlus
} from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../сontext';
import '../styles/Navbar.css';

export const Navbar = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);

	const logoutHandler = () => {
		auth.logout();
		// редирект на главную
		history.push('/');
	};

	return (
		<nav>
			<div
				className="nav-wrapper teal darken-1"
				style={{ padding: '0 2rem' }}
			>
				<span className="brand-logo">
					<img src="./logo-shortlink.png" alt="logo" />
				</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/create" title="Create short link">
							<FontAwesomeIcon icon={faPlus} />
							<FontAwesomeIcon icon={faLink} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/links" title="Go to links">
							<FontAwesomeIcon icon={faLink} />
							<FontAwesomeIcon icon={faLink} />
						</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHandler} title="LogOut">
							<FontAwesomeIcon icon={faSignOutAlt} />
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
