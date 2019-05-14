const puppeteer = require('puppeteer');
const env = reqlib('./utils/env');

module.exports = class BrowserLauncher {

	async launch() {
		const config = {
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			defaultViewport: {
				width: 1920,
				height: 1080
			}
		};

		if (env.remoteDebugging) {
			config.args.push([
				`--remote-debugging-address=${env.remoteDebuggingAddress}`,
				`--remote-debugging-port=${env.remoteDebuggingPort}`
			])
		}

		this.browser = await puppeteer.launch(config);

		console.log('🚀 Launch browser! \n');

		return this.browser;
	}

	async close() {
		console.log('💥 Browser is closed! \n');
		await this.browser.close();
	}
};