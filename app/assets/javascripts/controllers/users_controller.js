Photobooth.UsersController = Ember.ObjectController.extend({
  needs: ['camera', 'gallery'],

  init: function() {
    console.log('UsersController');
  }
});