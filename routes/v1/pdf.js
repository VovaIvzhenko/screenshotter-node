const btoa = require('btoa');
const PdfShotter = reqlib('./apps/pdf/PdfShotter');
const utils = reqlib('./helpers/other');

module.exports = function (fastify, opts, next) {

	fastify.get('/pdf/site/:site', async (request, reply) => {
		let site = utils.parseSite(request.params.site);

		if (!site) {
			return utils.responseError(reply, 422, 'Website is not valid');
		}

		try {
			const pdfShotter = new PdfShotter();
			const query = request.query;

			const buffer = await pdfShotter.run({
				site,
				scale: query.scale,
				displayHeaderFooter: utils.isTrue(query.displayHeaderFooter),
				printBackground: utils.isTrue(query.printBackground),
				landscape: utils.isTrue(query.landscape)
			});

			if (query.json) {
				return reply.send('data:application/pdf;base64,' + btoa(buffer));
			}
			reply.header('Content-type', 'application/pdf');
			return reply.send(buffer);
		} catch (error) {
			utils.responseError(reply, 500, 'Server error. Website is not valid');
		}
	});
	next();
};

// reply.header("Content-Disposition", "attachment;filename='downloaded.pdf'");
