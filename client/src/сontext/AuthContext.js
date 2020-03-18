import { createContext } from 'react';

const noop = () => {};

export const AuthContext = createContext({
	login: noop,
	logout: noop,
	userId: null,
	token: null,
	isAuthenticated: false
});
