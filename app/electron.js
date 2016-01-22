const BrowserWindow = require('browser-window');
const app = require('app');
const ipc = require('ipc');
const electronLocalshortcut = require('electron-localshortcut');
const fs = require('fs');
const mkdirp = require('mkdirp');
const RSVP = require('rsvp');
const root = `${app.getPath('home')}/dev/denote/example`;

var mainWindow = null;

function saveFile(event, id, file) {
  const path = `${root}/${id}`;
  const filePath = `${path}/meta.json`;
  mkdirp(path);

  try {
    fs.writeFile(filePath, file);
  } catch (error) {
    throw error;
  }
};

function loadNotes(event) {

  fs.readdir(root, function(error, files) {
    var filenames = files.filter(function(filename) {
      return filename.match(/^\d{13}$/);
    });

    // var notes = [];
    // var readFile = function(error, data) {
    //   if (error) { throw error; }
    //   notes.push(JSON.parse(data));
    // };
    RSVP.all(filenames.map(function(fn) {
      return new RSVP.Promise(function(resolve, reject) {
        fs.readFile(`${root}/${fn}/meta.json`, function(error, data) {
          if (error) { reject(error); }
          // notes.push(JSON.parse(data));
          resolve(JSON.parse(data));
        });
      });
    })).then(function(notes) {
      event.returnValue = {data: notes};
    });

  });

}

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 600
    });

    delete mainWindow.module;

    // TODO do not open DevTools
    mainWindow.openDevTools();
    if (process.env.ELECTRON_ENV === 'development') {
        mainWindow.loadURL('http://localhost:4200');
    } else {
        mainWindow.loadURL('file://' + __dirname + '/../dist/index.html');
    }

    mainWindow.on('closed', function onClosed() {
        mainWindow = null;
    });

    electronLocalshortcut.register(mainWindow, 'command+s', function () {
      mainWindow.webContents.send('local-shortcut-save-file');
    });

    electronLocalshortcut.register(mainWindow, 'command+shift+n', function () {
      mainWindow.webContents.send('local-shortcut-create-side-note');
    });

    ipc.on('save-file', saveFile);
    ipc.on('load-notes', loadNotes);
});

app.on('will-quit', function() {

  // Unregister all shortcuts.
  electronLocalshortcut.unregisterAll();
});
