import DS from 'ember-data';
const ipc = require('electron').ipcRenderer;

export default DS.JSONAPIAdapter.extend({

  _persistData: function(type, data, id) {
    if (!id) {
      id = +moment();
    }
    ipc.send('save-file', id, JSON.stringify(data));
  },

  findAll: function (store, type) {
    let results = ipc.sendSync('load-notes');
    return Ember.RSVP.resolve(results);
  },

  persistData(store, type, snapshot) {
    let serializer = store.serializerFor(type.modelName);
    let recordHash = serializer.serialize(snapshot, {includeId: true});

    this._persistData(type, recordHash.data,snapshot.id);
  },

  createRecord: function (store, type, snapshot) {
    this.persistData(store, type, snapshot);
    return Ember.RSVP.resolve();
  },

  updateRecord: function (store, type, snapshot) {
    this.persistData(store, type, snapshot);
    return Ember.RSVP.resolve();
  },
});
