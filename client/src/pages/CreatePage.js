import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttp, useMessage } from '../custom-hooks';
import { AuthContext } from '../сontext';
import '../styles/CreatePage.css';

export const CreatePage = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { request } = useHttp();
	const [link, setLink] = useState('');

	// обновляем поля формы
	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const pressHandler = async () => {
		try {
			const data = await request(
				'/api/link/generate',
				'POST',
				{ from: link },
				{
					Authorization: `Bearer ${auth.token}`,
					'Content-Type': 'application/json;charset=utf-8'
				}
			);
			// console.log(data);
			message(data.message);
			// clear form
			setLink('');
			// редирект на главную
			// history.push(`/detail/${data.link._id}`);
			history.push(`/links`);
		} catch (err) {
			message(`Error: ${err.message}, try again`);
		}
	};

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '25%' }}>
				<div className="input-field">
					<input
						id="link"
						type="text"
						className="green-input"
						placeholder="Enter Link"
						value={link}
						onChange={ev => {
							setLink(ev.target.value);
						}}
						// onKeyPress={pressHandler}
					/>
					<label htmlFor="link">Enter Link</label>
				</div>

				<div className="card-action">
					<button
						className="btn green lighten-1 black-text"
						disabled={link === ''}
						onClick={pressHandler}
					>
						Add link
					</button>
				</div>
			</div>
		</div>
	);
};
