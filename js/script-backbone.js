// Fix for bootstrap fluid thumbnails offset issue https://github.com/twitter/bootstrap/issues/3494
(function($){
    $('.row-fluid ul.thumbnails li.span6:nth-child(2n + 3)').css('margin-left','0px');
    $('.row-fluid ul.thumbnails li.span4:nth-child(3n + 4)').css('margin-left','0px');
    $('.row-fluid ul.thumbnails li.span3:nth-child(4n + 5)').css('margin-left','0px'); 

})(jQuery);


$(function() {
	

	navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
	window.URL = window.URL || window.webkitURL;


	// Doesn't recognize the jquery selected canvas element.
	var video = document.getElementById("vid");
	var canvas = document.getElementById("photo");
	var gallery = $(document.getElementById("gallery-list"));
	var ctx = canvas.getContext('2d');  
	var layersContainer;
	var image;
	var overlay;
	var frame_choice = null;
	var galleryView;
	
	
	init();

	function gotStream(stream) {
	  if (window.URL) {
	    video.src = window.URL.createObjectURL(stream);
		console.log("got video stream");
	  } else {
	    video.src = stream; // Opera.
	  }

	  video.onerror = function(e) {
	    stream.stop();
	  };

	  stream.onended = noStream;

	  video.onloadedmetadata = function(e) { // Not firing in Chrome. See crbug.com/110938.
		console.log("onloadedmetadata!");
	  };

	  // Since video.onloadedmetadata isn't firing for getUserMedia video, we have
	  // to fake it.
	  setTimeout(function() {
	    canvas.width = video.videoWidth;
	    canvas.height = video.videoHeight;
//		console.log("after timeout, set video height and width to " + canvas.height + " and " + canvas.width);

		// Initalize Canvas Layers
		initCanvas();
//		console.log("After init, layersContainer.children = " + layersContainer.children.length());
//		layersContainer.redraw();
		
	  }, 50);
	}
	
	
	function initCanvas() {
		
		console.log("Initalizating canvas layers.");
		
		layersContainer = new CanvasLayers.Container(canvas, true);	 // Allow transparency!
		layersContainer.onRender = function(layer, rect, context) {		
//			console.log("render layersContainer w:" + this.getWidth() + " h:" + this.getHeight());
	    }
		
//		console.log("Before init, layersContainer.children = " + layersContainer.children.length());
		
		
		image = new CanvasLayers.Layer(0, 0, canvas.width, canvas.height);
		image.onRender = function(layer, rect, context) {
			context.drawImage(video, 0, 0);
//			console.log("renderd video w:" + this.getWidth() + " h:" + this.getHeight());
		}
		
		// For now, we'll have just one frame at a time.
		// FIXME: Adding a new layer for each capture()
		overlay = new CanvasLayers.Layer(0, 0, canvas.width, canvas.height);
		overlay.onRender = function(layer, rect, context) {

			if(null != frame_choice) {
				context.drawImage(frame_choice, 0, 0);
//				console.log("rendered overlay");				
			} else {
//				console.log("No frame choice, don't render overlay. w:" + this.getWidth() + " h:" + this.getHeight());
			}

		}
				
		layersContainer.getChildren().add(image); // Added first, will be on bottom.
		layersContainer.getChildren().add(overlay);
		image.lowerToBottom(); // Just to be sure.
		
		
		// Initialize Backbone views
		galleryView = new GalleryView();
			
	}
	
	function noStream(e) {
	  var msg = 'No camera available.';
	  if (e.code == 1) {
	    msg = 'User denied access to use camera.';
	  }
		console.log(msg);
	}

	function capture() { 

		// Mark that the canvas has changed, then re-render.
		layersContainer.markRectsDamaged();	
		layersContainer.redraw();

		var image_src = canvas.toDataURL('image/webp');	
		var t = new Thumbnail();
		t.set("src", image_src);
		galleryView.collection.create(t);
		console.log(galleryView.collection.toJSON());

	}

	function init(el) {
		
		// Initialize Camera feed
		if (!navigator.getUserMedia) {
		    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
		    return;
		  }
		  navigator.getUserMedia({video: true}, gotStream, noStream);
	}	
	  


	$("#snap").click(capture);
	
	$("#frames").find("img").click(function() {
		frame_choice = this;
		
		f = document.createElement("img");
		f.src = this.src;
		$("#canvas-preview").html(f);
		
//		console.log("Clicked a frame: " + $(this).attr("src"));
//		ctx.drawImage(this, 0, 0); // It needs the entire image element.
	});
	
	
	
	// Rename to "clear frames".
	$("#remove").click(function() {

		// Actually, just clear out the frame but keep the layer there for drawing.
//		console.log("layersContainer.getChildren().length() = " + layersContainer.getChildren().length());
		if(frame_choice) {
			frame_choice =  null;
			$("#canvas-preview").html("");
			layersContainer.markRectsDamaged();	
			layersContainer.redraw();
		}


		// TODO: Use getLayerIndex to choose a specific one.
//		for(i = 0; layersContainer.getChildren().length() > 2; i++) {
//			console.log("Removed layer at index " + i);
//			trash = layersContainer.children.at(i);
//			layersContainer.getChildren().remove(trash);			
//		}
		
	});

	var overlay_item_template = "<li class='span6'><div class='thumbnail'><img src='{{src}}' alt='' /> </div></li>"

	$("#add-frame").submit(function() {
		
		// TODO: Real uploading.
		
		var s = $("input").val();
		var new_img = new Thumbnail();
		new_img.set("src", s);			
		var new_img_html = Mustache.render(overlay_item_template, new_img);	
		$("#frames").append(new_img_html);
		
		return false;
	});



	// Backbone Stuff.

	var Thumbnail = Backbone.Model.extend({
		defaults: {
			src: "http://placehold.it/193x145"
		}
	});
	
	var GalleryCollection = Backbone.Collection.extend({
		model: Thumbnail,
		localStorage: new Backbone.LocalStorage("GalleryCollection"),
	});

	// Changes to galleryView will be trigged by changes to it's collection which are done by capture in the camera view.
	var GalleryView = Backbone.View.extend({
		tagName: "ul",
		id: "gallery-list",	
		model: Thumbnail,
		galleryItemTemplate: "<div class='thumbnail'><img src='{{src}}'><a href='{{src}}' target='_blank'><img src='img/download-white-100-70.png' class='hover hover-thumbnail'></a><span><img src='img/remove-50.png' class='hover hover-delete'></span></div>",
		events: { // Automatically delegated
			"click .hover-delete" : "delete_thumbnail",
			"hover .thumbnail": "show_thumbnail_options"
		},
		initialize: function() {
			
			
			
			_.bindAll(this, "render", "delete_thumbnail", "show_thumbnail_options");			
			// Initialize and get collection from local storage if necessary.
			this.collection = new GalleryCollection();
			this.collection.fetch();
			
			this.render();
			console.log("Initialized GalleryView.")

		},
		render: function() {
			console.log("Render GalleryView");
			_(this.collection.models).each(function(item) {
				$(this.el).append(Mustache.render(this.galleryTemplate, item));	
			}, this);
			
			return this;
		},
		delete_thumbnail: function(e) {
			// Remove the element clicked.
			// Ideally, this change triggers the view to re-render. Otherwise, manually remove element here.
			var item = this.collection.where({src : e.target.closest("img").attr("src")});
			this.collection.remove(item);
		},
		show_thumbnail_options: function(e) {
			// Can you use this? to represent the element hovered?
			$(e.target).find(".hover-thumbnail").toggleClass("block");
			$(e.target).find(".hover-delete").toggleClass("block");
		}
	});

});


