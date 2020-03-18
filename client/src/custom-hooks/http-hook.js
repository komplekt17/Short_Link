import { useState, useCallback } from 'react';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const request = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setLoading(true);
			try {
				if (body) {
					body = JSON.stringify(body);
					// headers = {
					// 	'Content-Type': 'application/json;charset=utf-8'
					// };
				}

				const response = await fetch(url, { method, body, headers });
				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.message || 'Oops! Something`s happened happened'
					);
				}

				setLoading(false);
				return data;
			} catch (err) {
				setLoading(false);
				setError(err.message);
				throw err;
			}
		},
		[]
	);

	return {
		loading: loading,
		request,
		msgError: error,
		clearError
	};
};
