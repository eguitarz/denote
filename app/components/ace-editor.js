import Ember from 'ember';
const ipc = require('ipc');

export default Ember.Component.extend({
  didInsertElement: function() {
    this.set('editor', ace.edit('editor'));
  },

  actions: {
    save() {
      console.log('save', this.get('editor').getValue());
      ipc.send('save-file', this.get('editor').getValue());
    }
  }
});
