import Ember from 'ember';

const {
  set,
  get
} = Ember;

export default Ember.Component.extend({
  actions: {
    new() {
      let newCollection = {
        name: 'My Collection',
        priority: 1,
        created: new Date(),
        updated: new Date()
      };

      set(this, 'newCollection', newCollection);
    },

    create(collection) {
      set(this, 'newCollection', null);
      this.sendAction('createRecord', 'collection', collection);
    }
  }
});
