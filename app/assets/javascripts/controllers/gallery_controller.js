Photobooth.GalleryController = Ember.ArrayController.extend({
  itemController: 'photo',

  sortProperties: ['created_at'],

  sortAscending: false,

  actions: {
    clearGallery: function() {
      console.log('clearGallery');

      // TODO: Detect if user is saved to DB
      // If yes, need to save.

      this.get('model').clear();
    }
  }
});