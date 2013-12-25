!function(){window.JsPhotobooth=Ember.Application.create()}(),function(){JsPhotobooth.CameraController=Ember.ObjectController.extend({init:function(){this.set("layersContainer",null),this.set("canvas",null)},actions:{takePicture:function(){this.get("layersContainer").markRectsDamaged(),this.get("layersContainer").redraw();var a=this.store.createRecord("photo",{source:this.get("canvas").toDataURL("image/png")});a.save()}}})}(),function(){JsPhotobooth.GalleryController=Ember.ArrayController.extend({itemController:"photo",actions:{clearGallery:function(){console.log("clearGallery"),this.get("model").clear(),localStorage.clear()}}})}(),function(){JsPhotobooth.IndexController=Ember.ObjectController.extend({needs:["camera","gallery"]})}(),function(){JsPhotobooth.PhotoController=Ember.ObjectController.extend({actions:{deletePhoto:function(){this.get("model").deleteRecord(),this.get("model").save()}}})}(),function(){JsPhotobooth.Store=DS.Store.extend(),JsPhotobooth.ApplicationAdapter=DS.LSAdapter.extend({namespace:"js-photobooth"}),JsPhotobooth.ApplicationAdapter.on("QUOTA_EXCEEDED_ERR",function(){Ember.$("#error").text("No more space in localStorage")})}(),function(){JsPhotobooth.Photo=DS.Model.extend({source:DS.attr("string",{defaultValue:"http://placehold.it/193x145"})})}(),function(){JsPhotobooth.CameraView=Ember.View.extend({didInsertElement:function(){this._super(),Ember.run.scheduleOnce("afterRender",this,function(){this.initCamera()})},initCamera:function(){return navigator.getUserMedia=navigator.webkitGetUserMedia||navigator.getUserMedia,window.URL=window.URL||window.webkitURL,this.set("controller.layersContainer",null),this.set("controller.canvas",document.getElementById("photo")),this.video=document.getElementById("video"),this.$video=Ember.$("#video"),this.$error=Ember.$("#errorMessage"),navigator.getUserMedia?(navigator.getUserMedia({video:!0},this.cameraSuccess.bind(this),this.cameraFail.bind(this)),void 0):(this.$error.innerHTML="Sorry. <code>navigator.getUserMedia()</code> is not available.",void 0)},cameraSuccess:function(a){this.$("#camera_controls").show();var b=this;this.$error.text(""),this.video.src=window.URL?window.URL.createObjectURL(a):a,this.video.onerror=function(){a.stop()},a.onended=this.cameraFail,setTimeout(function(){b.get("controller.canvas").width=b.video.videoWidth,b.get("controller.canvas").height=b.video.videoHeight,b.showCanvas()},50)},cameraFail:function(){this.$error.show(),this.$video.css("background-image","url('images/error-75.png')")},showCanvas:function(){var a=this,b=new CanvasLayers.Container(this.get("controller.canvas"),!0);b.onRender=function(){},this.set("controller.layersContainer",b);var c=new CanvasLayers.Layer(0,0,this.get("controller.canvas").width,this.get("controller.canvas").height);c.onRender=function(b,c,d){d.drawImage(a.video,0,0)};var d=new CanvasLayers.Layer(0,0,this.get("controller.canvas").width,this.get("controller.canvas").height);d.onRender=function(a,b,c){null!=this.frame_choice&&c.drawImage(this.frame_choice,0,0)},this.get("controller.layersContainer").getChildren().add(c),this.get("controller.layersContainer").getChildren().add(d),c.lowerToBottom()}})}(),function(){JsPhotobooth.IndexView=Ember.View.extend({})}(),function(){JsPhotobooth.IndexRoute=Ember.Route.extend({renderTemplate:function(){this.render("index"),this.render("camera",{outlet:"camera",into:"index"}),this.render("gallery",{outlet:"gallery",into:"index"})},setupController:function(a){a.get("controllers.gallery").set("content",this.store.all("photo"))}})}();