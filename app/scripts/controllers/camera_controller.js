JsPhotobooth.CameraController = Ember.ObjectController.extend({
  init: function() {
    // Initialize properties for view to access
    this.set('layersContainer', null);
    this.set('canvas', null);
  },

  actions: {
    takePicture: function() {
      // FIXME: Runs out of memory very quickly... LS thing?
      // Uncaught QuotaExceededError: An attempt was made to add something to storage that exceeded the quota.
      // then, you can't even clearPictures

      // Draw the current video to canvas.
      this.get('layersContainer').markRectsDamaged();
      this.get('layersContainer').redraw();

      // Make a png from the canvas.
      var photo = this.store.createRecord('photo', {
        source: this.get('canvas').toDataURL('image/png')
      });

      photo.save();
    }
  }
});