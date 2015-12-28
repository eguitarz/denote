import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

const { isPresent, isNone, set, get, RSVP } = Ember;
const { hash } = RSVP;

export default Ember.Route.extend({
  model() {
    return {
      title: `Note on ${moment().format('ddd - MMM DD, YYYY')}`,
      notes: [],
      comments: [],
      isOnCommenting: false,
      isEditingComment: false
    };
  },

  actions: {
    newComment(blockIndex) {
      set(this, 'controller.model.isOnCommenting', true);
      let editor = $('.text-editor trix-editor')[0].editor;
      let document = editor.getDocument();
      let block = document.getBlockAtIndex(blockIndex);
      set(this, 'commentBlockId', block.id);

      let comments = get(this, 'controller.model.comments');
      let comment = comments.findBy('blockId', block.id);

      if(isNone(comment)) {
        this.send('clearCommentEditor');
      }
    },

    clearCommentEditor() {
      $('.comment-editor trix-editor')[0].editor.loadHTML();
    },

    createComment(html) {
      let comments = get(this, 'controller.model.comments');
      set(this, 'controller.model.isOnCommenting', false);
      let blockId = get(this, 'commentBlockId');

      let comment = comments.findBy('blockId', blockId);
      if (isPresent(comment)) {
        set(comment, 'html', html);
      } else {
        comments.pushObject({html, blockId: blockId});
      }
      console.log(this.get('controller.model'))
      console.log(comments);
    }
  }
});
