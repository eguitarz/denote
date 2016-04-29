import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('collections', function() {
    this.route('collections', {path: '/:collection_id'});
    this.route('note', { path: '/note/:note_id'});
  });
});

export default Router;
