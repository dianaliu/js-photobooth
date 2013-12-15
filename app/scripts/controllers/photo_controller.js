JsPhotobooth.PhotoController = Ember.ObjectController.extend({
  actions: {
    deletePhoto: function() {
      // Not sure why destroyRecord is method not found
      // this.get('model').destroyRecord();
      this.get('model').deleteRecord();
      this.get('model').save();

    }
  }
});