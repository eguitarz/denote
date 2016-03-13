import Ember from 'ember';

const {
  set,
  get
} = Ember;

export default Ember.Component.extend({
  actions: {
    create() {
      let newCollection = {
        name: 'My Collection',
        priority: 1,
        created: new Date(),
        updated: new Date()
      };

      this.sendAction('createRecord', 'collection', newCollection);
    }
  }
});
