/* Author: Diana Liu.

*/




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
		
				
	}
	
	function noStream(e) {
	  var msg = 'No camera available.';
	  if (e.code == 1) {
	    msg = 'User denied access to use camera.';
	  }
		console.log(msg);
	}

	function capture() { 
//	    ctx.drawImage(video, 0, 0);



		// Mark that the canvas has changed, then re-render.
		layersContainer.markRectsDamaged();	
		layersContainer.redraw();
	
		// Temporary: Draw straight to canvas
//		if(frame_choice) {
//			ctx.drawImage(frame_choice, 0, 0);
//		}

	    var img = document.createElement('img');
	    img.src = canvas.toDataURL('image/webp');	
	
		// Clear canvas of frame
//		if(frame_choice) {
//			ctx.drawImage(video, 0, 0);
//			frame_choice = null;			
//		}

		var hover_link = $(document.createElement("a"));
		hover_link.attr("href", img.src);
		hover_link.attr("target", "_blank");
			
		var hover_image = $(document.createElement('img'));
		hover_image.attr("src", "img/download-white-100-70.png");
		hover_image.addClass("hover").addClass("hover-thumbnail");
		
		var hover_wrapper = $(document.createElement('span'));
		var hover_delete = $(document.createElement('img'));
		hover_delete.attr("src", "img/remove-50.png");
		hover_delete.addClass("hover").addClass("hover-delete");
		hover_wrapper.append(hover_delete);
		
		var list = $(document.createElement("li"));
		list.addClass("span5");
		var div = $(document.createElement("div"));
		div.addClass("thumbnail"); // 189 x 144
		
		div.append(img);
		hover_link.append(hover_image);
		div.append(hover_link);
		div.append(hover_wrapper);
		list.append(div);	
	    gallery.append(list);
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
	
	// Must delegate because these elements aren't initally in dom.
	$("#gallery-list").delegate(".thumbnail", "hover", function() {
		$(this).find(".hover-thumbnail").toggleClass("block");
		$(this).find(".hover-delete").toggleClass("block");
//		console.log("hovered");
	});
	
	$("#gallery-list").delegate(".hover-delete", "click", function() {
		var list = $(this).closest("li");
		list.fadeOut('slow').remove();
//		console.log("remove list element.");
	});
	
	$("#frames").find("img").click(function() {
		frame_choice = this;
		
		f = document.createElement("img");
		f.src = this.src;
		$("#canvas-preview").html(f);
		
//		console.log("Clicked a frame: " + $(this).attr("src"));
//		ctx.drawImage(this, 0, 0); // It needs the entire image element.
	});
	
	
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

	
	
});

