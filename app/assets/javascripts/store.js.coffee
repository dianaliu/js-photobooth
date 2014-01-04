# http://emberjs.com/guides/models/using-the-store/

# Use DS.ActiveModelAdapter
Photobooth.Store = DS.Store.extend({
  adapter: DS.RESTAdapter.create()
});
