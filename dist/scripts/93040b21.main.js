!function(){window.JsPhotobooth=Ember.Application.create()}(),function(){JsPhotobooth.PhotoController=Ember.ObjectController.extend({init:function(){console.log("init photo controller")}})}(),function(){JsPhotobooth.PhotosController=Ember.ArrayController.extend({init:function(){console.log("init photos controller")}})}(),function(){JsPhotobooth.Store=DS.Store.extend(),JsPhotobooth.ApplicationAdapter=DS.LSAdapter.extend({namespace:"js-photobooth"})}(),function(){JsPhotobooth.Photo=DS.Model.extend({source:"http://placehold.it/193x145"})}(),function(){JsPhotobooth.ApplicationView=Ember.ArrayController.extend({init:function(){console.log("init ApplicationView")},didInsertElement:function(){console.log("didInsertElement for ApplicationView")}})}(),function(){JsPhotobooth.PhotosIndexView=Ember.ArrayController.extend({init:function(){console.log("init photosview")},didInsertElement:function(){console.log("didInsertElement for pohtosview")}})}(),function(){JsPhotobooth.Router.map(function(){this.resource("photos",{path:"/"})}),JsPhotobooth.PhotosRoute=Ember.Route.extend({renderTemplate:function(a){this.render("photos/index",{controller:a})}})}();