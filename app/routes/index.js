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
      let editor = new MediumEditor(element);
      set(this, 'editor', editor);
      return editor;
    },
    save(html) {
      console.log('saving', html);
      ipc.send('save-file', html);
    },
    createSideNote(timestamp, html) {
      const range = window.getSelection().getRangeAt(0);
      let controller = this.controller;
      controller.get('model.sideNotes').pushObject({
        range: range,
        html: '<div>This is a side note</div>',
        createdAt: +moment()
      });
      console.log(controller.get('model'));
      // console.log('createing side note for selected ', range, html);
    }
  }
});
