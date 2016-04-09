import Ember from 'ember';
import createComponentCard from 'ember-mobiledoc-editor/utils/create-component-card';

const {
  computed,
  get
} = Ember;

export default Ember.Component.extend({
  cards: computed(function() {
    return [
      createComponentCard('image-card')
    ];
  }),

  resources: computed('note.body.cards', function() {
    let cards = this.get('note.body.cards');
    return cards.map(([type, payload]) => ({
        type, payload
    }));
  })
});
