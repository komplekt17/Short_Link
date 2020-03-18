import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
	const [token, setUserToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ready, setReady] = useState(false);

	const login = useCallback((jwtToken, id) => {
		setUserToken(jwtToken);
		setUserId(id);

		localStorage.setItem(
			storageName,
			JSON.stringify({
				userId: id,
				token: jwtToken
			})
		);
	}, []);

	const logout = useCallback(() => {
		setUserToken(null);
		setUserId(null);
		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			login(data.token, data.userId);
		}

		setReady(true);
	}, [login]);

	return { login, logout, userId, token, ready };
};
