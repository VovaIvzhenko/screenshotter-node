const env = require('./utils/env');

const fastify = require('fastify')({
	logger: true
});

// start global settings
global.reqlib = require('app-root-path').require;
// end

if (env.dev) {
	fastify.register(require('fastify-cors'), {
		origin: true
	});
}

fastify.post('/api-node/v1/create/log', (request, reply) => {
	reply.send({result: 'success'})
});

fastify.register(require('./routes/v1/screenshot'), {
	prefix: '/api-node/v1'
});

fastify.register(require('./routes/v1/pdf'), {
	prefix: '/api-node/v1'
});

fastify.listen(env.port, (err, address) => {
	if (err) throw err;
	fastify.log.info(`server listening on ${address}`);
});