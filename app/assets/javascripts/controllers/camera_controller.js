Photobooth.CameraController = Ember.ObjectController.extend({
  init: function() {
    console.log('init CameraController');

    // Initialize properties for view to access
    this.set('layersContainer', null);
    this.set('canvas', null);
  },

  actions: {
    takePicture: function() {
      this.flashPage();

      // Draw the current video to canvas.
      this.get('layersContainer').markRectsDamaged();
      this.get('layersContainer').redraw();

      // Make a png from the canvas.
      var photo = this.store.createRecord('photo', {
        source: this.get('canvas').toDataURL('image/png'),
        created_at: new Date()
      });

      // FIXME: sometimes produces non-image.
      // photo.save(null);
    }
  },

  flashPage: function() {
    Ember.$('body').css('background-color', 'yellow');
    setTimeout(function() {
      Ember.$('body').css('background-color', 'white');
    }, 300);
  }
});