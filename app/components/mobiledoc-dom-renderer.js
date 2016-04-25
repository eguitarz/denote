import Ember from 'ember';
import Renderer from 'ember-mobiledoc-dom-renderer';
import _ from 'lodash/lodash';
import { imageCard } from 'denote/utils/cards';

let cards = [imageCard];
let atoms = [];
let renderer = new Renderer({cards, atoms});

export default Ember.Component.extend({
  didRender() {
    let mobiledoc = this.get('mobiledoc');
    if (!mobiledoc) {
      return;
    }

    if (this._teardownRender) {
      this._teardownRender();
      this._teardownRender = null;
    }

    let target = this.$();
    target.empty();
    try {
      let newMobiledoc = _.cloneDeep(mobiledoc);
      newMobiledoc.sections = newMobiledoc.sections.filter(([type]) => {
        return type === 10;
      });
      let { result, teardown } = renderer.render(newMobiledoc);
      target.append(result);
      this._teardownRender = teardown;
    } catch(e) {
      console.error(e);
      let result = document.createTextNode(e.message);
      target.append(result);
    }
  }
});
