Photobooth.User = DS.Model.extend({
  name: DS.attr('string'),

  // DS.attr is only evaluated once, new Date().getTime() computes once.
  created_at: DS.attr('date')
});