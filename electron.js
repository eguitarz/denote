const BrowserWindow = require('browser-window');
const app = require('app');
const ipc = require('ipc');
const fs = require('fs');
var mainWindow = null;

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    delete mainWindow.module;

    if (process.env.ELECTRON_ENV === 'development') {
        //mainWindow.openDevTools();
        mainWindow.loadUrl('http://localhost:5000');
    } else {
        mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');
    }

    mainWindow.on('closed', function onClosed() {
        mainWindow = null;
    });

    ipc.on('save-file', function (event, file) {
      const path = app.getPath('userDesktop') + '/denote-test-file'
      try {
        fs.writeFileSync(path, file);
      } catch (error) {
        throw error;
      }
    });
});
