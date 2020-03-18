const express = require('express');
// const cors = require('cors');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;
const URI = config.get('mongoUri') || 'localhost';

// app.use(cors());
app.use(express.json({ extended: true }));

const authRouter = require('./routes/auth-router');
const linkRouter = require('./routes/link-router');
const redirectRouter = require('./routes/redirect-router');

app.use('/api/auth', authRouter);
app.use('/api/link', linkRouter);
app.use('/t', redirectRouter);

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const startServer = async () => {
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('MongoDB connected successeful');
		app.listen(PORT, () => {
			console.log(`Server started successeful on port ${PORT}`);
		});
	} catch (err) {
		console.log('Connect error', err.message);
		// выход из потока
		process.exit({ code: 1 });
	}
};

startServer();
