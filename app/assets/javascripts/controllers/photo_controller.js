Photobooth.PhotoController = Ember.ObjectController.extend({
  actions: {
    deletePhoto: function() {
      if(this.get('model').get('isNew')) {
        this.get('model').deleteRecord();
      } else {
        // uh, can I just do model.delete or
        // do I have to remove it from the hasMany?
        // do i need to save individual record and relationship parent?
        this.get('model').deleteRecord();
        this.get('model').save();
        this.get('model').get('user').save();
      }
    },

    tweetPicture: function() {

    }
  }
});