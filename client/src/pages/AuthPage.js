import React, { useState, useEffect, useContext } from 'react';

import { useHttp, useMessage } from '../custom-hooks';
import { AuthContext } from '../сontext';
import '../styles/AuthPage.css';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, msgError, request, clearError } = useHttp();
	const initialState = {
		login: '',
		password: ''
	};
	const [form, setForm] = useState(initialState);

	useEffect(() => {
		message(msgError);
		clearError();
	}, [msgError, message, clearError]);

	// обновляем поля формы
	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeFieldHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	// обработчик регистрации
	const registerHandler = async user => {
		try {
			const data = await request('/api/auth/register', 'POST', user, {
				'Content-Type': 'application/json;charset=utf-8'
			});
			message(data.message);
		} catch (err) {}
	};

	// обработчик логина
	const loginHandler = async user => {
		try {
			const data = await request('/api/auth/login', 'POST', user, {
				'Content-Type': 'application/json;charset=utf-8'
			});
			// console.log(data);
			auth.login(data.token, data.userId);
			message(data.message);
		} catch (err) {}
	};

	return (
		<div className="auth-box">
			<div className="row">
				<div className="col s6 offset-s3">
					<div className="card blue-grey darken-1">
						<div className="card-content white-text">
							{/* <div className="row">
								<span className="card-title">AuthPage</span>
							</div> */}

							<form onClick={ev => ev.preventDefault()}>
								<div className="input-field">
									<input
										id="login"
										type="text"
										name="login"
										className="yellow-input"
										placeholder="Your Email"
										value={form.login}
										onChange={ev => changeFieldHandler(ev)}
									/>
									<label htmlFor="login">Enter Login</label>
								</div>
								<div className="input-field">
									<input
										id="password"
										type="text"
										name="password"
										className="yellow-input"
										placeholder="Password"
										value={form.password}
										onChange={ev => changeFieldHandler(ev)}
									/>
									<label htmlFor="password">Enter Password</label>
								</div>
							</form>
						</div>
						<div className="card-action">
							<button
								className="btn yellow darken-4"
								disabled={
									loading || form.login === '' || form.password === ''
								}
								onClick={() => {
									const user = {
										email: form.login,
										password: form.password
									};
									loginHandler(user);
									setForm({ ...form, login: '', password: '' });
								}}
							>
								login
							</button>
							<button
								className="btn grey lighten-1 black-text"
								disabled={
									loading || form.login === '' || form.password === ''
								}
								onClick={() => {
									const user = {
										email: form.login,
										password: form.password
									};
									registerHandler(user);
									setForm({ ...form, login: '', password: '' });
								}}
							>
								signin
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
