import Ember from 'ember';
import DS from 'ember-data';
import UndoStack from 'ember-undo-stack/undo-stack';

const {
  computed,
  get
} = Ember;

export default DS.Model.extend(UndoStack, {
    title: computed('blocks.firstObject.body', function() {
      let body = get(this, 'blocks.firstObject.body');
      if (body) {
        return body.substr(0, 100);
      }
    }),
    blocks: DS.attr(),
    createdAt: DS.attr(),
    updatedAt:DS.attr(),

    // checkpointData: computed('blocks.@each.body', function() {
    //   console.log('computing checkpoint data');
    //   return {
    //     blocks: this.get('blocks')
    //   };
    // }),

    compareTo(current, last) {
      return _.differenceBy(current, last, 'body') == '';
    },

    checkpointData: function() {
      console.log('computing checkpoint data', this.get('blocks'));
      return this.get('blocks');
    }.property('blocks'),

    restoreCheckpoint(data) {
      console.log('restore checkpoint', data);
      let blocks = data;
      this.setProperties({ blocks });
    }
});
