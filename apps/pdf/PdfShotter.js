const BrowserLauncher = reqlib('./apps/BrowserLauncher');

module.exports = class PdfShotter extends BrowserLauncher {

	async run(options) {
		let buffer;
		let config = {};
		
		try {
			await this.launch();
			const page = await this.browser.newPage();

			await page.goto(options.site, {
				waitUntil: 'networkidle0'
			});
			if (options.scale) {
				config.scale = parseFloat(options.scale);
			}
			if (options.displayHeaderFooter) {
				config.displayHeaderFooter = options.displayHeaderFooter;
			}
			if (options.printBackground) {
				config.printBackground = options.printBackground;
			}
			if (options.landscape) {
				config.landscape = options.landscape;
			}
			await page.emulateMedia('screen');

			buffer = await page.pdf(config);
		} catch (err) {
			this.close();
			throw new Error(`PdfShotter ${err}`);
		}

		this.close();

		return buffer;
	}
};
