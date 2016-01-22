import Ember from 'ember';
import KeyCode from 'denote/utils/key-code';

const {
  computed,
  get,
  isEmpty,
  isPresent
} = Ember;

function getBlockContainer(node) {
  while (node) {
    // Example block elements below, you may want to add more
    if (node.nodeType == 1 && /^(P|H[1-6]|DIV)$/i.test(node.nodeName)) {
        return node;
    }
    node = node.parentNode;
  }
};

export default Ember.Component.extend({
  classNames: ['note-editor'],

  didRender() {
    let openedNote = get(this, 'openedNote');
    let lastOpenedNote = get(this, '_openedNote')
    if (openedNote !== lastOpenedNote) {
      this.resizeComments(this.$());
    }

    this.send('save');
    openedNote.checkpoint();
  },

  resizeComments($component) {
    this.attrs.resizeComments($component);
  },

  // hasChanged: computed('openedNote.blocks.@each.body', () => {
  //   let note = get(this, 'openedNote');
  //   let lastBlocks = get(this, '_lastBlocks');
  //   let blocks = get(note, 'blocks');
  //   let diff = _.difference(lastBlocks, blocks);
  //   set('_lastBlocks', blocks);
  //
  //   let hasChanged = !isEmpty(diff);
  //   return hasChanged;
  // }),

  actions: {
    save() {
      let note = this.get('openedNote');
      note.save();
    },

    handleHtmlBlockKeyDown(block, text, event) {
      let note = this.get('openedNote');
      if (event.altKey) {
        note.checkpoint();
        console.log('save checkpoint', this.get('undoStack'))
      }

      let { keyCode } = event;
      if (keyCode === KeyCode.enter) {
        event.preventDefault();
        event.stopPropagation();
        this.send('insertBlockAfter', block);
      } else if (keyCode === KeyCode.backspace) {
        if (isEmpty(block.body)) {
          event.preventDefault();
          event.stopPropagation();
          console.log('send deleteBlock')
          this.send('deleteBlock', block);
        }
      } else if (keyCode === KeyCode.z) {
        if (event.metaKey) {
          // call custom undo
          event.preventDefault();
          event.stopPropagation();
          console.log('undo checkpoint');
          note.undo();
        }
      }
    },

    insertBlockAfter(block) {
      let blocks = this.get('openedNote.blocks');
      let index = blocks.indexOf(block);
      let content;

      let selection = window.getSelection();
      if (selection.rangeCount) {
        let selectionRange = selection.getRangeAt(0);
        let blockEl = getBlockContainer(selectionRange.endContainer);
        if (blockEl) {
          let range = selectionRange.cloneRange();
          range.selectNodeContents(blockEl);
          range.setStart(selectionRange.endContainer, selectionRange.endOffset);
          content = $('<div/>').html(range.extractContents()).html();
        }
      }

      blocks.insertAt(index + 1, {
        body: content
      });
    },

    deleteBlock(block) {
      let blocks = this.get('openedNote.blocks');
      blocks.removeObject(block);
      // TODO: focus in previous focused block
    }
  },

});
