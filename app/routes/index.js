import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

export default Ember.Route.extend({
  actions: {
    save(html) {
      console.log('saving', html);
      ipc.send('save-file', html);
    },
    createNote(range) {
      console.log('createing note for selected ', range);
    }
  }
});
