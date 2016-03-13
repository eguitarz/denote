import DS from 'ember-data';
import Ember from 'ember';

const {
  computed,
  get
} = Ember;

export default DS.Model.extend({
  body: DS.attr('string'),
  priority: DS.attr('number'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  summary: computed('body', function() {
    return get(this, 'body').slice(0, 20);
  }),

  collection: DS.belongsTo('collection', { async: true })
});
