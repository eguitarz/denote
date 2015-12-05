import Ember from 'ember';
import moment from 'moment';
const { computed } = Ember;
const ipc = require('electron').ipcRenderer;

export default Ember.Component.extend({
  classNames: ['text-editor-wrapper'],

  didInsertElement() {
    let editor = new MediumEditor(this.$('.text-editor'));
    this.set('editor', editor);
    this.set('lastSavedAt', +moment());
    editor.subscribe('editableInput', (event, editable) => {
      const now = moment();
      if (now.diff(this.get('lastSavedAt')) > 5000 ) {
        this.send('save', event, editable);
      }
    });
    ipc.on('global-shortcut-save-file', () => {
      this.send('save');
    });
    ipc.on('global-shortcut-create-note', () => {
      this.send('createNote');
    });
  },

  actions: {
    save(event, editable) {
      this.set('lastSavedAt', event.timeStamp);
      this.sendAction('on-save', $(editable).html());
    },

    createNote() {
      const range = window.getSelection().getRangeAt(0);
      this.sendAction('on-create-note', range);
    }
  }
});
