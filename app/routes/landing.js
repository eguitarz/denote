import Ember from 'ember';

const {
  computed,
  isNone,
  isPresent,
  set,
  get
} = Ember;

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('collection');
  },

  actions: {
    loadNotes(collection) {
      return $.get(`/collection/${collection.id}/notes`).then( ({data}) => {

        let selectedNote = get(this, 'controller.selectedNote');
        data.forEach((n, i) => {
          let note = this.store.normalize('note', n);
          let storeNote = this.store.push(note);
          collection.get('notes').pushObject(storeNote);

          if ( i === 0 && isNone(selectedNote)) {
            this.send('select', storeNote);
          }
        });

      });
    },

    select(note) {
      const isSelectedKey = 'isSelected';
      let selectedNote = get(this, 'controller.selectedNote');
      if (isPresent(selectedNote) ) {
        set(selectedNote, isSelectedKey, false);
      }

      if (isPresent(note)) {
        set(note, isSelectedKey, true);
      }

      set(this, 'controller.selectedNote', note);
    },

    createRecord(type, object) {
      let record = this.store.createRecord(type, object);

      if(type === 'note') {
        this.send('select', record);
      }
    },

    deleteRecord(record) {
      console.log('record', record);
      if (isPresent(record)) {
        console.log('deleteRecord')
        this.store.deleteRecord(record);
        this.send('select', null);
        record.save();
      }
    }

  },

});
