import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var editor = ace.edit('editor');
  }
});
