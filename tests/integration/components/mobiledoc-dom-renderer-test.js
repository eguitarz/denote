import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobiledoc-dom-renderer', 'Integration | Component | mobiledoc dom renderer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{mobiledoc-dom-renderer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#mobiledoc-dom-renderer}}
      template block text
    {{/mobiledoc-dom-renderer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
