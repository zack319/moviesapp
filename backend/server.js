const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// logging
// const rfs = require('rotating-file-stream');
// const morgan = require('morgan');

// .env file
require('dotenv').config();

const app = express();
app.use(bodyParser.json({limit: '1024mb'}));
const server = http.createServer(app);
// const socketio = socketIO(server, {
// 	cors: {
// 		origin: "*",
// 		allowedHeaders: ["Access-Control-Allow-Origin"]
// 	}
// });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '1024mb'}));
app.use(express.urlencoded({limit: '1024mb'}));

const uri = process.env.DB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connection established.');
})

// define routes
const UserRoute = require('./routes/users');
// const SubmissionRoute = require('./routes/submission');
// const EmailRoute = require('./routes/email');
// const SupportRoute = require('./routes/support');
// const NotificationRoute = require('./routes/notifications');

// use route
// app.use('/', DashRoute);
app.use('/users', UserRoute);
// app.use('/submission', SubmissionRoute);
// app.use('/support', SupportRoute);
// app.use('/notifications', NotificationRoute);

// start server
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
})
