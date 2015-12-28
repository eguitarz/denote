import Ember from 'ember';
import moment from 'moment';
const { computed, set, get } = Ember;
const ipc = require('electron').ipcRenderer;

const SAVING_GAP_TIME = 3000;

const EDITOR_CLASS='.text-editor';

const customizedButtonHTML = `
  <button type="button" class="h1 heading" data-attribute="h1" data-key="1" aria-label="Heading level 1">H1</button>
  <button type="button" class="h2 heading" data-attribute="h2" data-key="2" aria-label="Heading level 2">H2</button>
`;

function updateCommentButtonPosition(element) {
  const { top } = $(element).position();
  $('.create-comment-button').css('top', `${top}px`)
};

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

    this._bindHoverEvent();
    this._bindBlurEvent();
  },

  _bindHoverEvent() {
    const ELEMENT_SELECTOR = 'div, blockquote, li, pre, h1, h2, h3';
    let trixEditor = this;
    this.$('trix-editor')
      .on('mouseenter', ELEMENT_SELECTOR, function(event) {
        let index = $('trix-editor').find(ELEMENT_SELECTOR).index(this);
        set(trixEditor, 'lastBlockIndex', index);
        $('#denote-app').addClass('-is-commentable');
        updateCommentButtonPosition(this);
      })
  },

  _bindBlurEvent() {
    let trixEditor = this;
    this.$('trix-editor').on('blur', function() {
      // Ember.run.later(() => $('#denote-app').removeClass('-is-commentable'), 100);
    });
  },

  // TODO fix it once trix support multiple editors
  _insertCustomButtons() {
    let groupElement = Trix.config.toolbar.content.querySelector('.block_tools');
    groupElement.insertAdjacentHTML('afterbegin', customizedButtonHTML);
  },

  actions: {
    handleLocalShortcutSaveFile(timestamp, html) {
      ipc.send('save-file', html);
      this.attrs.lastSavedAt = timestamp;
    },

    handleContentChange(event) {
      let editor = event.target.editor;
      let html = editor.getDocument().toString();
      set(this, 'lastSavedAt', +moment());
      ipc.send('save-file', html);
    },

    handleSelectionChange(event) {
      let editor = event.target.editor;
      set(this, 'lastPosition', editor.getPosition());
    }
  }
});
