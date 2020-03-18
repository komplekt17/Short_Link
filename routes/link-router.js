const router = require('express').Router();
const shortid = require('shortid');

const URL = require('config').get('baseUrl');
const Link = require('../models/link-model');
const authMiddleware = require('../middleware/auth-middleware');

// /api/link/generate - генерация ссылки
router.post('/generate', authMiddleware, async (req, res) => {
	try {
		// получаем длинную ссылку
		const { from } = req.body;
		// формируем короткую ссылку
		const code = shortid.generate();

		// проверяем наличие link в БД
		const exsistLink = await Link.findOne({ from });

		if (exsistLink) {
			return res
				.status(200)
				.json({ link: exsistLink, message: `That link exists already` });
		}

		const to = URL + '/t/' + code;

		// coхраняем ссылку в БД
		const link = new Link({
			code,
			to,
			from,
			owner: req.user.userId
		});

		await link.save();
		return res
			.status(200)
			.json({ link, message: 'Short link created successeful' });
	} catch (err) {
		return res
			.status(500)
			.json({ message: `str 38: Error: ${err.message}, try again` });
	}
});

// /api/link/ - получить все ссылки
router.get('/', authMiddleware, async (req, res) => {
	try {
		const links = await Link.find({ owner: req.user.userId });
		return res.status(201).json(links);
	} catch (err) {
		return res
			.status(500)
			.json({ message: `Error: ${err.message}, try again` });
	}
});

// /api/link/ - получить ссылку по id
router.get('/:id', authMiddleware, async (req, res) => {
	try {
		// console.log(req.params.id);
		const link = await Link.findById(req.params.id);
		res.json(link);
	} catch (err) {
		return res
			.status(500)
			.json({ message: `Error: ${err.message}, try again` });
	}
});

// /api/link/remove - получить ссылку по id
router.delete('/remove/:id', authMiddleware, async (req, res) => {
	try {
		// console.log(req.params.id);
		const link = await Link.findOneAndDelete({ _id: req.params.id });
		if (link) {
			return res.status(201).json({
				message: 'This link was removed successful!'
			});
		}
		return res.status(404).json({
			massage: 'Link not found'
		});
	} catch (err) {
		return res
			.status(500)
			.json({ message: `Error: ${err.message}, try again` });
	}
});

module.exports = router;
