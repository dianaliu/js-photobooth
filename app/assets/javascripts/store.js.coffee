# http://emberjs.com/guides/models/using-the-store/

# Use DS.ActiveModelAdapter
Photobooth.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create()
});
