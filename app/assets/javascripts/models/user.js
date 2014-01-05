Photobooth.User = DS.Model.extend({
  photos: DS.hasMany('Photo'),

  name: DS.attr('string', { defaultValue: 'anon' })
});