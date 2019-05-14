const BrowserLauncher = reqlib('./apps/BrowserLauncher');
const devices = require('puppeteer/DeviceDescriptors');

module.exports = class ScreenShotter extends BrowserLauncher {
	async run(options) {
		console.log('\n',options ,'\n')

		let buffer;
		let config = {};

		try {
			await this.launch();
			const page = await this.browser.newPage();

			if (options.device) {
				await page.emulate(devices[options.device]);
			}
			await page.goto(options.site);

			if (options.type) {
				config.type = options.type
			}

			if (options.fullPage) {
				config.fullPage = options.fullPage;
				await this.scroll(page);
			}

			if (options.quality && options.type === 'jpeg') {
				config.quality = parseInt(options.quality);
			}

			buffer = await page.screenshot(config);
		} catch (err) {
			await this.close();
			throw new Error(`ScreenShotter ${err}`);
		}

		await this.close();

		return buffer;
	}

	async scroll(page) {
		return await page.evaluate(async () => {
			function sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			}

			for (let i = 0; i < (Math.ceil(document.body.scrollHeight / window.innerHeight)); i++) {
				await sleep(200);
				window.scrollBy(0, window.innerHeight);
			}
			return document.body.scrollHeight
		});
	}

	devices() {
		return devices
	}

};