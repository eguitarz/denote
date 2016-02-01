import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['note-list'],

  sortedNotes: computed.sort('notes', (a, b) => {
    if (a.id > b.id) {
      return -1;
    } else if (a.id < b.id) {
      return 1;
    } else {
      return 0;
    }
  })
});
