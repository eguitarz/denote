import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('notebook', function() {
    this.route('collections', { path: '/collections/:collection_id' });
    this.route('notes', { path: '/notes/:note_id' });
  });
});

export default Router;
