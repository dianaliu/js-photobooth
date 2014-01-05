Photobooth.CameraView = Ember.View.extend({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.initCamera();
    });
  },

  initCamera: function() {
    // TODO: Flip image.

    console.log('initCamera');

    // Account for cross browser differences
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;

    window.URL = window.URL || window.webkitURL;

    // Initialize controller elements
    this.set('controller.layersContainer', null);
    this.set('controller.canvas', document.getElementById("photo"));

    // Initialize elements
    this.video = document.getElementById("video");
    this.$video = Ember.$('#video');
    this.$alertText = Ember.$('.alert p');

    console.log('set els: ', this.$video, this.$alertText);

    // Check if modern browser
    if (!navigator.getUserMedia) {
      this.$error.text("Sorry, your browser is not supported");
      return;
    }

    this.$alertText.text("requesting access");

    // Request access to camera
    navigator.getUserMedia({ video: true }, this.cameraSuccess.bind(this), this.cameraFail.bind(this));
    // navigator.getUserMedia({ video: true }, this.cameraSuccess, this.cameraFail);
    // navigator.getUserMedia({ video: true }, function() { alert("s") }, function() { alert("e") });


  },

  cameraSuccess: function(stream) {
    console.log('cameraSuccess');


    // FIXME: Not called.
    // TODO: Add a class or property that holds this state
    // for displaying buttons and messages?

    console.log('cameraSuccess, what els?');
    console.log(this.$alertText);


    this.$alertText.parent().hide();
    this.$('#camera_controls').show();

    var view = this;

    // Clear any error message
    this.$alertText.text("");

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
    console.log('cameraFail');

    this.$alertText.text('Camera is not available').parent().show();
    this.$video.css("background-image", "url('images/error-75.png')");
  },

  showCanvas: function() {
    // TODO: What is going on here? Add comments!
    console.log('showCanvas');



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