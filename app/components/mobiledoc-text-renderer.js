import Ember from 'ember';
import Renderer from 'ember-mobiledoc-text-renderer';

let renderer = new Renderer();

let addHTMLEntitites = (str) => {
  return str.replace(/</g,  '&lt;')
            .replace(/>/g,  '&gt;')
            .replace(/\n/g, '');
};

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
      let {result: text, teardown} = renderer.render(mobiledoc);
      let padEllipsis = this.get('padEllipsis');
      let charLimit = this.get('charLimit');

      if (charLimit) {
        let slicedText = addHTMLEntitites(text.substr(0, charLimit));

        if (padEllipsis && text.length > charLimit) {
          slicedText += '…';
        }

        text = slicedText;
      }

      target.html(text);

      this._teardownRender = teardown;
    } catch(e) {
      console.error(e);
      let result = document.createTextNode(e.message);
      target.append(result);
    }
  }
});
