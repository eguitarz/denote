import Ember from 'ember';

const { computed, isNone, set, get } = Ember;

export default Ember.Component.extend({
  classNameBindings: [':comments', 'isOnCommenting:-is-on-commenting'],

  actions: {
    handleCommentChange(event) {
      let editor = event.target.editor;
      let html = editor.getDocument().toString();
      set(this, 'lastSavedAt', +moment());
      set(this, 'newCommentHTML', html);
    }
  }
});
