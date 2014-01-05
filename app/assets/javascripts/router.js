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
    this.render('camera', { outlet: 'camera' , into: 'users', controller: 'camera' });
    this.render('gallery', { outlet: 'gallery', into: 'users' });
  },

  setupController: function(controller) {
    // Calls users#index
    // Photobooth.User.find();

    console.log('setupController');

    var user = this.store.createRecord('user', { name: "diana" });
    console.log('user', user, user.get('photos'));
    user.save();

    // controller.get('controllers.gallery').set('content', );
    controller.get('controllers.camera').set('content', user);
  }
});