import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

const { set } = Ember;

export default Ember.Route.extend({
  actions: {
    setEditor(element) {
      let editor = new MediumEditor(element);
      set(this, 'editor', editor);
      return editor;
    },
    save(html) {
      console.log('saving', html);
      ipc.send('save-file', html);
    },
    createSideNote(timestamp, html) {
      const range = window.getSelection().getRangeAt(0);
      console.log('createing side note for selected ', range, html);
    }
  }
});
