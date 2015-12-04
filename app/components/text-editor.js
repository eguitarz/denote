import Ember from 'ember';
const { computed } = Ember;
const ipc = require('electron').ipcRenderer;

export default Ember.Component.extend({
  classNames: ['text-editor'],
  attributeBindings: ['contentEditable'],
  contentEditable: 'true',

  html() {
    return this.$().html();
  },

  didInsertElement() {
    ipc.on('global-shortcut-save-file', () => {
      this.send('save');
    });
  },

  actions: {
    save() {
      this.sendAction('on-save', this);
    }
  }
});
