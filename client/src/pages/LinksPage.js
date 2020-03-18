import React, {
	useState,
	useContext,
	useCallback,
	useEffect
} from 'react';
import { useHttp, useMessage } from '../custom-hooks';
import { AuthContext } from '../сontext';
import { Loader, LinksList } from '../components';

export const LinksPage = () => {
	const [links, setLinks] = useState([]);
	const { loading, request } = useHttp();
	const auth = useContext(AuthContext);
	const message = useMessage();

	const fetchLinks = useCallback(
		async (req, res) => {
			try {
				const fetched = await request('/api/link', 'GET', null, {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${auth.token}`
				});
				setLinks(fetched);
			} catch (err) {
				return res
					.status(500)
					.json({ message: `Error: ${err.message}, try again` });
			}
		},
		[auth, request]
	);

	// удаление ссылки
	const removeClickHandler = async idx => {
		try {
			const data = await request(
				`/api/link/remove/${idx}`,
				'DELETE',
				null,
				{
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${auth.token}`
				}
			);
			message(data.message);
			fetchLinks();
		} catch (err) {
			message(`Error: ${err.message}, try again`);
		}
	};

	useEffect(() => {
		fetchLinks();
	}, [fetchLinks]);

	if (loading) return <Loader />;

	return (
		<div style={{ margin: '0 60px' }} className="">
			<h4>Link List</h4>
			{!loading && (
				<LinksList links={links} removeClick={removeClickHandler} />
			)}
		</div>
	);
};
