import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  didUpdate() {
    const autofocus = get(this, 'autofocus');

    if (autofocus) {
      this.$('.ember-content-editable').focus();
    }
  },

  actions: {
    updateBlock(block) {
      // $('.ember-content-editable').focus();
      window.document.execCommand("formatBlock", false, block);
      console.log('block', block)
    },
  }
});
