import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

const { set, get, RSVP } = Ember;
const { hash } = RSVP;

export default Ember.Route.extend({
  model() {
    return {
      notes: [],
      comments: []
    };
  },

  actions: {
    newComment(blockIndex) {
      let editor = $('.text-editor trix-editor')[0].editor;
      let document = editor.getDocument();
      let block = document.getBlockAtIndex(blockIndex);
      console.log('add comment for block at ', blockIndex, block);

      let comments = get(this, 'controller.model.comments');
      console.log(comments);
      comments.pushObject({html: block.toString()});
    }
  }
});
