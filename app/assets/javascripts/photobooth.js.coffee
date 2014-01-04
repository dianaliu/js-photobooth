# for more details see: http://emberjs.com/guides/application/
window.Photobooth = Ember.Application.create({
  rootElement: '.main'
})

#= require ./store
#= require_tree ./models
#= require_tree ./controllers
#= require_tree ./views
#= require_tree ./helpers
#= require_tree ./components
#= require_tree ./templates
#= require_tree ./routes
#= require ./router
#= require_self

