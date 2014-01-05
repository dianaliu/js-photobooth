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

      var photo = this.store.createRecord('photo', { url: this.get('canvas').toDataURL('image/png') });
      this.get('model').get('photos').pushObject(photo);

      // TODO: If user is logged in, save
    }
  },

  flashPage: function() {
    Ember.$('body').css('background-color', 'yellow');
    setTimeout(function() {
      Ember.$('body').css('background-color', 'white');
    }, 150);
  }
});