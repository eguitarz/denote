import Ember from 'ember';

const { RSVP, get, set } = Ember;
const { documnet } = window;

export default Ember.Route.extend({
  model() {
    let notes = this.store.findAll('note');
    return RSVP.hash({notes});
  },

  afterModel(model) {
    let firstNote = model.notes.get('firstObject');
    console.log('controller.model.notes', model.notes);
    set(firstNote, 'isOpened', true);
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
    },

    createNote() {
      let note = this.store.createRecord('note', {
        id: +moment(),
        blocks: [
          {
            id: 1,
            body: ''
          }
        ]});
      note.save();
      // note.save();
    },

    resizeComments($component) {
      if ($component) {
        $component.find('.note-editor__block-row').each(function() {
          var height = $(this).height();
          $component.find('.note-editor__comment').css('height', height);
        });
      }
    }
  }
});
