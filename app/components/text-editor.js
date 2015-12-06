import Ember from 'ember';
import moment from 'moment';
const { computed } = Ember;
const ipc = require('electron').ipcRenderer;

const SAVING_GAP_TIME = 3000;

export default Ember.Component.extend({
  classNames: ['text-editor-wrapper'],

  didInsertElement() {
    const EDITOR_CLASS = '.text-editor';
    let editor = this.attrs.setEditor(this.$(EDITOR_CLASS));

    editor.subscribe('editableInput', (event, editable) => {
      let lastSavedAt = this.attrs.lastSavedAt || 0;
      if (moment().diff(lastSavedAt) > SAVING_GAP_TIME ) {
        this.send('handleSave', event.timeStamp, $(editable).html());
      }
    });

    ipc.on('local-shortcut-save-file', () => {
      this.send('handleSave', +moment(), this.$(EDITOR_CLASS).html());
    });
    ipc.on('local-shortcut-create-side-note', () => {
      this.send('handleCreateSideNote', +moment(), '<div>This is a side note</div>');
    });
  },

  actions: {
    handleSave(timestamp, html) {
      this.attrs.save(html);
      this.attrs.lastSavedAt = timestamp;
    },
    handleCreateSideNote(timestamp, html) {
      this.attrs.createSideNote(timestamp, html);
    }
  }
});
