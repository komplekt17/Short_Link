const jwt = require('jsonwebtoken');
const JWT_KEY = require('config').get('jwtSecret');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

		if (!token) {
			return res
				.status(401)
				.json({ message: `Token was not geted. User is not authorized` });
		}
		// декодируем token
		const decoded = jwt.verify(token, JWT_KEY);
		// сохраняем в поле user
		req.user = decoded;

		// продолжение выполнения запроса
		next();
	} catch (error) {
		return res.status(401).json({ message: `User is not authorized` });
	}
};
