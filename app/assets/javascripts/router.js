// For more information see: http://emberjs.com/guides/routing/

Photobooth.Router.map(function() {
this.resource('users', function() {
  this.resource('photos', function() {
     // Nothing yet.
    });
  });
});

Photobooth.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('users');
  }
});

Photobooth.UsersRoute = Ember.Route.extend({
  renderTemplate: function() {
    // TODO: Need to set controllers?
    this.render('users');
    this.render('camera', { outlet: 'camera' , into: 'users' });
    this.render('gallery', { outlet: 'gallery', into: 'users' });
  },

  setupController: function(controller) {
    // Calls users#index
    // Photobooth.User.find();

    console.log('setupController');

    // Try getting user from server (async)
    // will it update the controllers automatically once it has come back?
    var user = this.store.createRecord('user', { name: "anon" });
    // user.save();

    controller.get('controllers.gallery').set('content', user.get('photos'));
    controller.get('controllers.camera').set('content', user);
  }
});