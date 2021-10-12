require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('middleware/error-handler');
const { nodeEnv, port } = require('config.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/api', require('./api'));

// global error handler
app.use(errorHandler);

// start server
const newPort = nodeEnv === 'production' ? (port || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + newPort));
