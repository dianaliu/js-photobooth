// Fix for bootstrap fluid thumbnails offset issue https://github.com/twitter/bootstrap/issues/3494
(function($){
	
	// delegate this
	
    $('.row-fluid ul.thumbnails li.span6:nth-child(2n + 3)').css('margin-left','0px');
    $('.row-fluid ul.thumbnails li.span5:nth-child(2n + 3)').css('margin-left','0px');
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
	var default_overlay_items = ['frame_unicorn.png', 'frame_2.png', 'frame_4.png', 'frame_5.png'];
	var overlay_item_template = "<li class='span6'><div class='thumbnail'><img src='{{src}}' alt='' /> </div></li>";
	var gallery_item_template = "<li class='span5'><div class='thumbnail'><img src='{{src}}'><a href='{{src}}' target='_blank'><img src='img/download-white-100-70.png' class='hover hover-original'></a><span><img src='img/remove-50.png' class='hover hover-delete'></span></div></li>";
	
	
	// ==============================  
	// 		Backbone Shizz
	// ==============================
	
	var Photo = Backbone.Model.extend({
		src: "http://placehold.it/193x145"
	});
	
	var PhotoCollection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("PhotoCollection"),
		model: Photo
	});
	
	var GalleryItemView = Backbone.View.extend({
		tagName: "li",
		events: {
			"click .hover-delete": "remove",
			"hover .thumbnail": "toggle"		
		},
		initialize: function() {
			_.bindAll(this, "render", "remove", "unrender", "toggle");
			this.model.bind("remove", this.unrender); // If the model is deleted, unrender.
		},
		render: function() {			
			$(this.el).html("<div class='thumbnail'><img src='" + this.model.get("src") + "'><a href='" + this.model.get("src") + "' target='_blank'><img src='img/download-white-100-70.png' class='hover hover-original'></a><span><img src='img/remove-50.png' class='hover hover-delete'></span></div>");
			
			$(this.el).addClass("span5");
			
			return this; // for method chaining
		},
		unrender: function() {
			$(this.el).remove();	
		},
		remove: function() {
			this.model.destroy(); // triggers unrender
		},
		toggle: function(e) {
			// FIXME: Weird delay and gets stuck.
			$(".hover-original", e.target).toggleClass("block");
			$(".hover-delete", e.target).toggleClass("block");
			console.log("toggle");
		}		
	});


	GalleryListView = Backbone.View.extend({
		el: $("div"),
		id: "gallery",
		events: { // Selectors only search descendents.
			"click #capture": "capture",
			"click #remove": "clear_frames"
		},
		initialize: function() {
			
			_.bindAll(this, "render", "appendItem", "capture"); // Each function that uses this must be bound
			
			this.collection = new PhotoCollection();
			this.collection.bind("add", this.appendItem); // appendItem after adding to collection

			this.collection.fetch();

			this.render();
		},
		render: function() {
			var self = this;
			
			_(this.collection.models).each(function(item) {
				self.appendItem(item);	
			}, this);
		},
		appendItem: function(item) {		
			var galleryItemView = new GalleryItemView({
				model: item,
				collection: this.collection
			});
			
			$("ul#gallery-list", this.el).append(galleryItemView.render().el);
		},
		capture: function() {			
			layersContainer.markRectsDamaged();	
			layersContainer.redraw();
			var p = new Photo();
			p.set("src", canvas.toDataURL('image/png'));
			this.collection.create(p); // create is add and sync.
	
			return false;	
		},
		clear_frames: function(e) {
			if(frame_choice) {
				frame_choice =  null;
				$("#canvas-preview").html("");
				layersContainer.markRectsDamaged();	
				layersContainer.redraw();
				console.log("clear frames");
			}
		}
	});

	var galleryListView = new GalleryListView();

	
	// ==============================  
	// 		Camera Shizz
	// ==============================
	
	function init(el) {
		
		// Initialize Camera feed
		if (!navigator.getUserMedia) {
		    document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
		    return;
		  }
		  navigator.getUserMedia({video: true}, gotStream, noStream);
		
		
		$.each(default_overlay_items, function(i, item) {
			$('#frames').append(Mustache.render(overlay_item_template, {src: ("img/" + item	)}));
		});
		
		
	}
	
	function initCanvas() {
		
		console.log("Initalize canvas layers.");
		
		layersContainer = new CanvasLayers.Container(canvas, true);	 // Allow transparency!
		layersContainer.onRender = function(layer, rect, context) {		
	    }
		
		image = new CanvasLayers.Layer(0, 0, canvas.width, canvas.height);
		image.onRender = function(layer, rect, context) {
			context.drawImage(video, 0, 0);
		}
		
		// For now, we'll have just one frame at a time.
		overlay = new CanvasLayers.Layer(0, 0, canvas.width, canvas.height);
		overlay.onRender = function(layer, rect, context) {

			if(null != frame_choice) {
				context.drawImage(frame_choice, 0, 0);
			} 
		}
				
		layersContainer.getChildren().add(image); // Added first, will be on bottom.
		layersContainer.getChildren().add(overlay);
		image.lowerToBottom(); // Just to be sure.	
	}
	
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
		initCanvas();
	  }, 50);
	}
	
	function noStream(e) {
		
		var msg = 'No camera available.';
			  if (e.code == 1) {
			    msg = 'User denied access to use camera.';
		  }

		$("#vid").css("background-image", "url('img/error-75.png')");
		console.log(msg);		
	}
 

	// ==============================  
	// 		Register Events
	// ============================== 
	
	$("#frames").on("click", "img", function (e) {
		frame_choice = e.target;
		
		f = document.createElement("img");
		f.src = this.src;
		$("#canvas-preview").html(f);
	});

	// Rename to "clear".
	$("#remove").click(function() {

		// Clear out the frame but keep the layer there for drawing.
		if(frame_choice) {
			frame_choice =  null;
			$("#canvas-preview").html("");
			layersContainer.markRectsDamaged();	
			layersContainer.redraw();
		}
	
	});

	$("#add-frame").submit(function() {
		
		// TODO: Real uploading.
		var s = $("input").val();
		var new_img = new Photo();
		new_img.set("src", s);			
		var new_img_html = Mustache.render(overlay_item_template, new_img);	
		$("#frames").append(new_img_html);
		
		return false;
	});
	
	
	init();
});


