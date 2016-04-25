import Ember from 'ember';

const {
  set
} = Ember;

export default Ember.Component.extend({
  actions: {
    selectCollection(collection) {
      this.sendAction('selectCollection', collection);

      if (collection.get('notes.length') === 0) {
        this.sendAction('loadNotes', collection);
      }
    },

    expandCollection(collection) {
      // TODO: Find a better way to trigger ajax
      if (collection.get('notes.length') === 0) {
        this.sendAction('loadNotes', collection);
      }

      let isExpanded = collection.get('isExpanded');
      collection.set('isExpanded', !isExpanded);
    },

    setMenuMode(mode) {
      set(this, 'menuMode', mode);
    }
  }
});
