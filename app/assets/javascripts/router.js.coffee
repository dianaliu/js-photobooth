# # For more information see: http://emberjs.com/guides/routing/

# Photobooth.Router.map ()->
#   @resource('user')
#   @resource('photo')

# Photobooth.IndexRoute = Ember.Route.extend(
#   renderTemplate: ->
#     @render "index"
#     @render "camera",
#       outlet: "camera",
#       into: "index"
#     @render "gallery",
#       outlet: "gallery",
#       into: "index"

#   setupController: (controller) ->
#     controller.get("controllers.gallery").set "content", @store.find("photo")
# )
