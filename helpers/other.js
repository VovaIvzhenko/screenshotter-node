module.exports = {
	isTrue(str) {
		return str == 'true';
	},
	isWebsite(str) {
		return /^https?:\/\/.+([-.].+)*\..{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(str)
	},
	parseSite(site) {
		if (!~site.indexOf('http')) {
			site = `http://${site}`
		}

		if (this.isWebsite(site)) {
			return site
		}

		return false;
	},
	responseError(reply, code, message) {
		console.log('[code]: ', code);
		// reply.code(code);
		return reply.send({error: message});
	}
};
