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
    console.log('setupController');

    this.store.find('user').then(function(a,b,c) {
      console.log('user success', model);
      console.log(model.get('id'));
      console.log(model.get('photos'));
    }, function(xhr) {
      console.log('user error', xhr.responseText);
    });

    // FIXME: Is store.find async?
    // If async, will it update the controllers automatically?
    var user = this.store.createRecord('user', { name: "anon" });

    console.log(user.get('id'));

    controller.get('controllers.gallery').set('content', user.get('photos'));
    controller.get('controllers.camera').set('content', user);
  }
});