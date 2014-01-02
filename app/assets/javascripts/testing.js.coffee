# jQuery ->
#   $("a[rel~=popover], .has-popover").popover()
#   $("a[rel~=tooltip], .has-tooltip").tooltip()

# Turbolinks like behavior for xhr requests
$(document).ajaxSuccess (event, xhr, settings) ->
  $('.container').html(xhr.responseText) if !xhr.responseText