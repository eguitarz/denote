import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  priority: DS.attr('number'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  notes: DS.hasMany('notes', { async: true })
});
