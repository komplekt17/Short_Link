const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user-model');
const JWT_KEY = require('config').get('jwtSecret');

// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'That email is not valid').isEmail(),
		check(
			'password',
			'Your password must contain min 6 symbols'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errArray = errors.array();
				return res.status(400).json({
					errors: errArray,
					message: errArray[0].msg
				});
			}
			const { email, password } = req.body;

			const checkUser = await User.findOne({ login: email });

			// если такой email уже есть в БД
			if (checkUser) {
				return res
					.status(400)
					.json({ message: `Email: ${email} is already occuped` });
			} else {
				// хешируем пароль
				const hashedPassword = await bcrypt.hash(password, 12);
				// регистрируем юзера
				const user = new User({ login: email, password: hashedPassword });

				await user.save();
				return res
					.status(201)
					.json({ message: 'New user created successeful' });
			}
		} catch (err) {
			return res
				.status(500)
				.json({ message: `Error: ${err.message}, try again` });
		}
	}
);

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'That email is not valid')
			.normalizeEmail()
			.isEmail(),
		check('password', 'Your password must contain min 6 symbols').exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			const errArray = errors.array();
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errArray,
					message: errArray[0].msg
				});
			}

			const { email, password } = req.body;
			const user = await User.findOne({ login: email });
			// если такого login нет в БД, возвращаем текст ошибки
			if (!user) {
				return res
					.status(400)
					.json({ message: `Login: ${email} not found` });
			}
			// если такой login есть в БД, то сравниваем пароль с БД
			else {
				const checkPassword = await bcrypt.compare(
					password,
					user.password
				);
				// если пароли не совпадают, возвращаем текст ошибки
				if (!checkPassword) {
					return res
						.status(400)
						.json({ message: 'Your password is not correct, try again' });
				}
				// если пароли совпадают, возвращаем авторизационный токен
				else {
					const token = jwt.sign({ userId: user.id }, JWT_KEY, {
						expiresIn: '1h' // период окончания/экспирации токена
					});
					return res
						.status(201)
						.json({
							token,
							userId: user.id,
							message: 'Successful Authorization'
						});
				}
			}
		} catch (err) {
			return res
				.status(500)
				.json({ message: `Error: ${err.message}, try again` });
		}
	}
);

module.exports = router;
