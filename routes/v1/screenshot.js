const btoa = require('btoa');
const ScreenShotter = reqlib('./apps/screenshot/ScreenShotter');
const utils = reqlib('./helpers/other');

module.exports = function (fastify, opts, next) {

	fastify.get('/screenshot/site/:site', async (request, reply) => {
		let site = utils.parseSite(request.params.site);

		if (!site) {
			return utils.responseError(reply, 422, 'Website is not valid');
		}

		try {
			const screenShotter = new ScreenShotter();
			const query = request.query;

			const buffer = await screenShotter.run({
				site,
				fullPage: utils.isTrue(query.fullPage),
				device: query.device,
				type: query.type,
				quality: query.quality
			});

			reply.send(`data:image/${query.type} ;base64,${btoa(buffer)}`);
		} catch (error) {
			utils.responseError(reply, 500, 'Server error. Website is not valid');
		}
	});

	fastify.get('/screenshot/get/devices/', async (request, reply) => {
		const screenShotter = new ScreenShotter();
		const devices = screenShotter.devices();
		reply.send({devices});
	});

	next();
};