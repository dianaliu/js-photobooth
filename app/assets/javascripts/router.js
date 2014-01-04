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
  // renderTemplate: function() {
  //   this.render('index');
  //   this.render('camera', { outlet: 'camera' , into: 'index' });
  //   this.render('gallery', { outlet: 'gallery', into: 'index' });
  // },

  // setupController: function(controller) {
  //   console.log('setupController');
  //   controller.get('controllers.gallery').set('content', this.store.find('user'));
  // }
});