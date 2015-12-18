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
    save(event) {
      let editor = event.target.editor;
      let html = editor.getDocument().toString();
      set(this, 'lastSavedAt', +moment());
      console.log('saving', html);
      ipc.send('save-file', html);
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
