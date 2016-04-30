import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let { collection_id: collectionId } = params;
    return this.store.findRecord('collection', collectionId);
  }
});
