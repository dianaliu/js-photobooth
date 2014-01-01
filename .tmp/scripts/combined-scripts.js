(function() {

var JsPhotobooth = window.JsPhotobooth = Ember.Application.create();

/* Order and include as you please. */


})();

(function() {

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
        source: this.get('canvas').toDataURL('image/png'),
        created_at: new Date()
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

})();

(function() {

JsPhotobooth.GalleryController = Ember.ArrayController.extend({
  itemController: 'photo',

  sortProperties: ['created_at'],

  sortAscending: false,

  actions: {
    clearGallery: function() {
      console.log('clearGallery');

      // works, but doesn't save
      // model and content are the same thing

      // FIXME: A proper solution
      // haha or maybe forget localStorage and do it snapchat style?
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

})();

(function() {

JsPhotobooth.IndexController = Ember.ObjectController.extend({
  needs: ['camera', 'gallery']
});

})();

(function() {

JsPhotobooth.PhotoController = Ember.ObjectController.extend({
  actions: {
    deletePhoto: function() {
      // Not sure why destroyRecord is method not found
      // this.get('model').destroyRecord();
      this.get('model').deleteRecord();
      this.get('model').save();

    },

    tweetPicture: function() {

    }
  }
});

})();

(function() {

JsPhotobooth.Store = DS.Store.extend();
JsPhotobooth.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'horcrux'
});

})();

(function() {

JsPhotobooth.Photo = DS.Model.extend({
  source: DS.attr('string', { defaultValue: "http://placehold.it/193x145" }),

  // DS.attr is only evaluated once, new Date().getTime() computes once.
  created_at: DS.attr('date')
});

})();

(function() {

JsPhotobooth.TwitterClient = DS.Model.extend({

});

})();

(function() {

JsPhotobooth.CameraView = Ember.View.extend({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.initCamera();
     });
  },

  initCamera: function() {
    // TODO: Flip image.

    // Account for cross browser differences
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
    window.URL = window.URL || window.webkitURL;

    // Initialize controller elements
    this.set('controller.layersContainer', null);
    this.set('controller.canvas', document.getElementById("photo"));

    // Initialize elements
    this.video = document.getElementById("video");
    this.$video = Ember.$('#video');
    this.$error = Ember.$('#errorMessage p');

    // Check if modern browser
    if (!navigator.getUserMedia) {
      this.$error.text("Sorry, your browser is not supported");
      return;
    }

    // Request access to camera
    navigator.getUserMedia({ video: true }, this.cameraSuccess.bind(this), this.cameraFail.bind(this));
  },

  cameraSuccess: function(stream) {
    // TODO: Add a class or property that holds this state
    // for displaying buttons and messages?

    this.$error.parent().hide();
    this.$('#camera_controls').show();

    var view = this;

    // Clear any error message
    this.$error.text("");

    // Only Opera lets you use the stream directly
    this.video.src = (window.URL ? window.URL.createObjectURL(stream) : stream);
    this.video.onerror = function(e) { stream.stop(); };
    stream.onended = this.cameraFail;

    // Since video.onloadedmetadata isn't firing for getUserMedia video, we have
    // to fake it.
    setTimeout(function() {
      view.get('controller.canvas').width = view.video.videoWidth;
      view.get('controller.canvas').height = view.video.videoHeight;
      view.showCanvas();
    }, 50);
  },

  cameraFail: function() {
    this.$error.text('Camera is not available').parent().show();
    this.$video.css("background-image", "url('images/error-75.png')");
  },

  showCanvas: function() {
    // TODO: What is going on here? Add comments!

    var view = this;

    var layersContainer = new CanvasLayers.Container(this.get('controller.canvas'), true);  // Allow transparency!
    layersContainer.onRender = function(layer, rect, context) {};
    this.set('controller.layersContainer', layersContainer);

    var image = new CanvasLayers.Layer(0, 0, this.get('controller.canvas').width, this.get('controller.canvas').height);
    image.onRender = function(layer, rect, context) {
      context.drawImage(view.video, 0, 0);
    };

    // For now, we'll have just one frame at a time.
    var overlay = new CanvasLayers.Layer(0, 0, this.get('controller.canvas').width, this.get('controller.canvas').height);
    overlay.onRender = function(layer, rect, context) {
      if(null != this.frame_choice) {
        context.drawImage(this.frame_choice, 0, 0);
      }
    };

    this.get('controller.layersContainer').getChildren().add(image); // Added first, will be on bottom.
    this.get('controller.layersContainer').getChildren().add(overlay);
    image.lowerToBottom(); // Just to be sure.
  }
});

})();

(function() {

JsPhotobooth.IndexView = Ember.View.extend({
});

})();

(function() {

// To view all routes
// Ember.keys(JsPhotobooth.Router.router.recognizer.names)

JsPhotobooth.IndexRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('index');
    this.render('camera', { outlet: 'camera' , into: 'index' });
    this.render('gallery', { outlet: 'gallery', into: 'index' });
  },

  setupController: function(controller) {
    controller.get('controllers.gallery').set('content', this.store.find('photo'));
  }
});

})();