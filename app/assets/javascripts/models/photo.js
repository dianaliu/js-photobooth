Photobooth.Photo = DS.Model.extend({
  source: DS.attr('string', { defaultValue: "http://placehold.it/193x145" }),

  // DS.attr is only evaluated once, new Date().getTime() computes once.
  created_at: DS.attr('date')
});