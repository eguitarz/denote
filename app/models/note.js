import DS from 'ember-data';
import Ember from 'ember';

const {
  computed,
  get
} = Ember;

export default DS.Model.extend({
  body: DS.attr(),
  priority: DS.attr('number'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  summary: computed('body', function() {
    let html = get(this, 'body.sections.firstObject');
    return $('<div/>').html(html).text().slice(0, 20);
  }),

  collection: DS.belongsTo('collection', { async: true })
});
