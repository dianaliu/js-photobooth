Photobooth.Photo = DS.Model.extend({
  user: DS.belongsTo('Photobooth.User'),

  url: DS.attr('string')
});