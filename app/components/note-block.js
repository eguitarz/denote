import Ember from 'ember';
import ContentEditable from 'ember-content-editable/components/content-editable';

export default ContentEditable.extend({
  keyDown(event) {
    this._super(...arguments);
    event.data = this;
  }
});
