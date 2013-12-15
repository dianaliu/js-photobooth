JsPhotobooth.CameraView = Ember.View.extend({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.initCamera();
     });
  },

  initCamera: function() {
    // Account for cross browser differences
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
    window.URL = window.URL || window.webkitURL;

    // Initialize controller elements
    this.set('controller.layersContainer', null);
    this.set('controller.canvas', document.getElementById("photo"));

    // Initialize elements
    this.video = document.getElementById("video");
    this.$video = Ember.$('#video');
    this.$error = Ember.$('#errorMessage');

    // Check if modern browser
    if (!navigator.getUserMedia) {
      this.$error.innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
      return;
    }

    // Request access to camera
    navigator.getUserMedia({ video: true }, this.cameraSuccess.bind(this), this.cameraFail.bind(this));
  },

  cameraSuccess: function(stream) {
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
    this.$error.text("Camera is not available");
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