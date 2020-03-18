import React, {
	useState,
	useCallback,
	useEffect,
	useContext
} from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../custom-hooks';
import { AuthContext } from '../сontext';
import { Loader, LinkCard } from '../components';

export const DetailPage = () => {
	const auth = useContext(AuthContext);
	const { request, loading } = useHttp();
	const [link, setLink] = useState(null);
	const linkId = useParams().id;

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `Bearer ${auth.token}`
			});
			// console.log(fetched);
			setLink(fetched);
		} catch (error) {}
	}, [auth, linkId, request]);

	useEffect(() => {
		getLink();
	}, [getLink]);

	if (loading) {
		return <Loader />;
	}
	return <>{!loading && link && <LinkCard link={link} />}</>;
};
