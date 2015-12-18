import Ember from 'ember';
import moment from 'moment';
const { computed } = Ember;
const ipc = require('electron').ipcRenderer;

const SAVING_GAP_TIME = 3000;
const EDITOR_CLASS='.text-editor';

export default Ember.Component.extend({
  classNames: ['text-editor-wrapper'],
  didInsertElement() {

    ipc.on('local-shortcut-save-file', () => {
      let element = this.$(EDITOR_CLASS)[0];
      let editor = element.editor;
      let html = editor.getDocument().toString();
      this.send('handleLocalShortcutSaveFile', +moment(), html);
    });
    ipc.on('local-shortcut-create-side-note', () => {
      let id = 0;
      // this.send('handleCreateSideNote',
      //           editor,
      //           +moment(),
      //           id);
    });
  },

  actions: {
    handleLocalShortcutSaveFile(timestamp, html) {
      ipc.send('save-file', html);
      this.attrs.lastSavedAt = timestamp;
    }
  }
});
