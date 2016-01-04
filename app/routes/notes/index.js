import Ember from 'ember';

const { RSVP, get, set } = Ember;

export default Ember.Route.extend({
  model() {
    let store = this.store;

    store.push({
      data: [{
        id: 1,
        type: 'note',
        attributes: {
          title: 'note 1',
          blocks: [{
            id: 1,
            body: 'This is note 1 - block 1',
            comment: 'This is comment of note 1 - block 1'
          }, {
            id: 2,
            body: 'This is note 1 - block 2',
            comment: 'This is comment of note 1 - block 2'
          }]
        },
      }, {
        id: 2,
        type: 'note',
        attributes: {
          title: 'note 2',
          blocks: [{
            id: 1,
            body: 'This is note 2 - block 1',
            comment: 'This is comment of note 2 - block 1'
          }, {
            id: 2,
            body: 'This is note 2 - block 2',
            comment: 'This is comment of note 2 - block 2'
          }]
        },
      }]
    });

    return {
      notes: this.store.peekAll('note')
    };
  },

  actions: {
    loadNote(id) {
      console.log('loading note', id)
      let notes = get(this, 'controller.model.notes');

      notes.forEach((note) => {

        if (note.id === id) {
          set(note, 'isOpened', true);
        } else {
          set(note, 'isOpened', false);
        }

      });
    }
  }
});
