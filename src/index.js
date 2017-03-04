const {app, BrowserWindow } = require('electron');
// const PDFWindow = require('electron-pdf-window');

app.on('ready', () => {
	let win = new BrowserWindow({width:800, height:600});
	// PDFWindow.addSupport(win);
	// win.setMenu(null);
	win.loadURL(`file://${__dirname}/index.html`);


	// win.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf');

});
app.on('window-all-closed', () => {
  app.quit()
})