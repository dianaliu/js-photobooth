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

      this.get('store').create({ name: "diana"});

      // var user = new Photobooth.User({ name: "diana" });

      // user.save();

      // Make a png from the canvas.
      // var photo = Photobooth.Photo.createRecord({
      //   url: this.get('canvas').toDataURL('image/png'),
      // });

      // photo.save();
    }
  },

  flashPage: function() {
    Ember.$('body').css('background-color', 'yellow');
    setTimeout(function() {
      Ember.$('body').css('background-color', 'white');
    }, 150);
  }
});