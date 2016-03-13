import Ember from 'ember';

const {
  set
} = Ember;

export default Ember.Component.extend({
  actions: {
    selectCollection(collection) {
      // TODO: Find a better way to trigger ajax
      if (collection.get('notes.length') === 0) {
        this.sendAction('loadNotes', collection);
      }

      set(this, 'currentCollection', collection);
      this.send('setMenuMode', 'note')
    },

    setMenuMode(mode) {
      set(this, 'menuMode', mode);
    }
  }
});
