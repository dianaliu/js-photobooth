JsPhotobooth.GalleryController = Ember.ArrayController.extend({
  itemController: 'photo',

  actions: {
    clearGallery: function() {
      console.log('clearGallery');

      // works, but doesn't save
      // model and content are the same thing

      // FIXME: A proper solution
      this.get('model').clear();
      localStorage.clear();

      // this.get('model').invoke('save');

      // only removes one at a time and doesn't save
      // var photos = this.get('content');
      // photos.invoke('deleteRecord').invoke('save');


      // does nothing at all
      // photos.invoke('destroyRecord');

      // this.get('model').forEach(function(photo) {
      //   photo.deleteRecord();
      //   photo.save();
      // });



      // per doc, but queries twice?
      // Cannot call method 'lookup' of undefined
      // all returns a live filter
      // var photos = this.get('model').all('photo');
      // this.get('model').invoke('save');
      // photos.invoke('deleteRecord');
      // photos.invoke('save');
    }
  }
});