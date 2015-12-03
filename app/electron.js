const BrowserWindow = require('browser-window');
const app = require('app');
const ipc = require('ipc');
const electronLocalshortcut = require('electron-localshortcut');
const fs = require('fs');
var mainWindow = null;

function saveFile(event, file) {
  const path = app.getPath('userDesktop') + '/denote-test-file'
  try {
    fs.writeFileSync(path, file);
  } catch (error) {
    throw error;
  }
};

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
        mainWindow.loadURL('http://localhost:5000');
    } else {
        mainWindow.loadURL('file://' + __dirname + '/../dist/index.html');
    }

    mainWindow.on('closed', function onClosed() {
        mainWindow = null;
    });

    electronLocalshortcut.register(mainWindow, 'command+s', function () {
      mainWindow.webContents.send('global-shortcut-save-file');
    });

    ipc.on('save-file', saveFile);
});

app.on('will-quit', function() {
  
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
