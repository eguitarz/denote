import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

export default Ember.Component.extend({
  classNames: ['text-editor'],
  attributeBindings: ['contentEditable'],
  contentEditable: 'true',

  didInsertElement() {
    ipc.on('global-shortcut-save-file', () => {
      console.log('recieved global-shortcut-save-file');
      this.send('save');
    });
  },

  actions: {
    save() {
      console.log('saving', this.$().text());
      ipc.send('save-file', this.$().text());
    }
  }
});
