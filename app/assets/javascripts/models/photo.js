Photobooth.Photo = DS.Model.extend({
  user: DS.belongsTo('user'),

  url: DS.attr('string')
});