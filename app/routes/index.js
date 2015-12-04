import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

export default Ember.Route.extend({
  actions: {
    saveFile(editor) {
      console.log('saving', editor.html());
      ipc.send('save-file', editor.html());
    }
  }
});
