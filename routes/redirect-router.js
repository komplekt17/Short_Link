const router = require('express').Router();
const Link = require('../models/link-model');

router.get('/:code', async (req, res) => {
	try {
		const link = await Link.findOne({ code: req.params.code });

		if (link) {
			// увеличиваем счётчик
			link.clicks++;
			// сохраняем clicks в БД
			await link.save();
			// перенапрвляем на полную ссылку
			return res.redirect(link.from);
		}
		return res.status(404).json({ message: `Link not found` });
	} catch (err) {
		return res
			.status(500)
			.json({ message: `Error: ${err.message}, try again` });
	}
});

module.exports = router;
