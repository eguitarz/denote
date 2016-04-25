import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobiledoc-text-renderer', 'Integration | Component | mobiledoc text renderer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{mobiledoc-text-renderer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#mobiledoc-text-renderer}}
      template block text
    {{/mobiledoc-text-renderer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
