Photobooth.User = DS.Model.extend({
  photos: DS.hasMany('Photobooth.Photo'),

  name: DS.attr('string', { defaultValue: 'anon' })
});