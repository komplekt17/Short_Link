import { useCallback } from 'react';

export const useMessage = () => {
	return useCallback(text => {
		let bgcMessage = 'red darken-4';
		if (
			text === 'Successful Authorization' ||
			text === 'New user created successeful' ||
			text === 'Short link created successeful' ||
			text === 'This link was removed successful!'
		) {
			bgcMessage = 'green darken-1';
		}
		if (window.M && text) {
			const toastAlert = `<span>${text}</span>`;
			window.M.toast({
				html: toastAlert,
				displayLength: 4000,
				inDuration: 700,
				classes: `ronded ${bgcMessage}`
			});
		}
	}, []);
};
