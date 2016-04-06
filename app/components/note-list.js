import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    create() {
      let newNote = {
        body: '',
        priority: 1,
        created: new Date(),
        updated: new Date()
      };


      newNote.collection = this.get('currentCollection');
      this.sendAction('createRecord', 'note', newNote);
    }
  }
});
