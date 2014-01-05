Photobooth.User = DS.Model.extend({
  photos: DS.hasMany('photo'),

  name: DS.attr('string', { defaultValue: 'anon' })
});