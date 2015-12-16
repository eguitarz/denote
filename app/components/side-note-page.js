import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['side-note-page'],

  didInsertElement() {
    this.send('createEditor', this.$('#side-note-default-editor'));
  },

  actions: {
    createEditor(element) {
      console.log(element)
      return new MediumEditor(element, {
        placeholder: {
          text: 'Type New Comment'
        }
      });
    }
  }
});
