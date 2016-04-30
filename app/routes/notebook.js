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
    save(body) {
      console.log('save', body)
      let selectedNote = get(this, 'controller.selectedNote');
      selectedNote.set('body', body);
    },

    loadNotes(collection) {
      return $.get(`/collection/${collection.id}/notes`).then( ({data}) => {

        let selectedNote = get(this, 'controller.selectedNote');
        data.forEach((n, i) => {
          let note = this.store.normalize('note', n);
          let storeNote = this.store.push(note);
          collection.get('notes').pushObject(storeNote);
        });

      });
    },

    selectNode(node) {
      let previousNode = this.get('controller.selectedNode');

      if (previousNode) {
        previousNode.set('isSelected', false);
      }

      this.set('controller.selectedNode', node);
      node.set('isSelected', true);
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
