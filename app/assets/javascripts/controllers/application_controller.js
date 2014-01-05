Photobooth.ApplicationController = Ember.ObjectController.extend({

  init: function() {
    console.log('ApplicationController');
  },

  actions: {
    loginTwitter: function() {
      console.log('loginTwitter');
      console.log(this.get('model'));
    }
  }
});