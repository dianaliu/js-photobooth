JsPhotobooth.CameraController = Ember.ObjectController.extend({
  init: function() {
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
        source: this.get('canvas').toDataURL('image/png')
      });

      // FIXME: doesn't warn anymore?
      // FIXME: sometimes produces non-image.
      photo.save(null, this.warnOutOfSpace);
    }
  },

  flashPage: function() {
    Ember.$('body').css('background-color', 'yellow');
    setTimeout(function() {
      Ember.$('body').css('background-color', 'white');
    }, 300);
  },

  warnOutOfSpace: function() {
    // TODO: Abstract warns to app scope

    console.log('warn out of space');

    this.$error = Ember.$('#errorMessage p');

    this.$error.text('Error saving image. Click "Delete All Photos" and try again.');
    this.$error.parent().show();
  }
});