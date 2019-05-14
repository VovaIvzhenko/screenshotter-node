require('dotenv').config();
const utils = require('../helpers/other');

module.exports = {
	port: process.env.APP_PORT || 3030,
	dev: process.env.APP_ENV === 'dev',
	domain: process.env.APP_DOMAIN || 'localhost',
	remoteDebugging: utils.isTrue(process.env.REMOTE_DEBUGGING) || false,
	remoteDebuggingPort: process.env.REMOTE_DEBUGGING_PORT || 3030,
	remoteDebuggingAddress: process.env.REMOTE_DEBUGGING_ADDRESS || '93.190.142.28',
}