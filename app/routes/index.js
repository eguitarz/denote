import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

const { set, RSVP } = Ember;
const { hash } = RSVP;

export default Ember.Route.extend({
  model() {
    return {
      mainContent: '',
      sideNotes: []
    };
  },

  actions: {
    setEditor(element) {
      let editor = new MediumEditor(element, {
        buttonLabels: 'fontawesome', // use font-awesome icons for other buttons
      });
      set(this, 'editor', editor);
      return editor;
    },
    save(html) {
      console.log('saving', html);
      ipc.send('save-file', html);
    },
    createSideNote(timestamp, selection) {
      let controller = this.controller;
      controller.get('model.sideNotes').pushObject({
        selection: selection,
        html: '<div>This is a side note</div>',
        createdAt: +moment()
      });
      window.s = selection;
      console.log(controller.get('model'));
      // console.log('createing side note for selected ', range, html);
    }
  }
});

function genId()
{
    const ID_LENGTH = 4;
    let output = [];
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < ID_LENGTH; i++ ) {
      output += source.charAt(Math.floor(Math.random() * source.length));
    }

    return output;
}
