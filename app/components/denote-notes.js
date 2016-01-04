import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({
  classNames: ['app-wrapper'],

  openedNote: computed('notes.@each.isOpened', function() {
    let notes = get(this, 'notes');
    return notes.findBy('isOpened', true);
  })
});
