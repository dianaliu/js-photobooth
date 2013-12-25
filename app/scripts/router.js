// To view all routes
// Ember.keys(JsPhotobooth.Router.router.recognizer.names)

JsPhotobooth.IndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('index');
    this.render('camera', { outlet: 'camera' , into: 'index' });
    this.render('gallery', { outlet: 'gallery', into: 'index' });
  },

  setupController: function(controller) {
    controller.get('controllers.gallery').set('content', this.store.find('photo'));
  }
});