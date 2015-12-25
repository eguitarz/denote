import Ember from 'ember';
import moment from 'moment';
const { computed } = Ember;
const ipc = require('electron').ipcRenderer;

const SAVING_GAP_TIME = 3000;
const EDITOR_CLASS='.text-editor';

const customizedButtonHTML = `
  <button type="button" class="h1 heading" data-attribute="h1" data-key="1" aria-label="Heading level 1">H1</button>
  <button type="button" class="h2 heading" data-attribute="h2" data-key="2" aria-label="Heading level 2">H2</button>
`;

export default Ember.Component.extend({
  classNames: ['editor'],

  // custom config goes here
  config: {
    blockAttributes: {
      h1: {
        tagName: 'h1',
      },
      h2: {
        tagName: 'h2',
      }
    },
    textAttributes: {
      comment: {
        tagName: 'com'
      }
    }
  },

  init() {
    this._super(...arguments);
    this._insertCustomButtons();
  },

  didInsertElement() {
    this._super(...arguments);

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

  _insertCustomButtons() {
    let groupElement = Trix.config.toolbar.content.querySelector('.block_tools');
    groupElement.insertAdjacentHTML('afterbegin', customizedButtonHTML);
    console.log(groupElement)
  },

  actions: {
    handleLocalShortcutSaveFile(timestamp, html) {
      ipc.send('save-file', html);
      this.attrs.lastSavedAt = timestamp;
    }
  }
});
