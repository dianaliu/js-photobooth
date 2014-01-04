# http://emberjs.com/guides/models/using-the-store/

Photobooth.Store = DS.Store.extend
  adapter: DS.RESTAdapter.create()
  # Override the default adapter with the `DS.ActiveModelAdapter` which
  # is built to work nicely with the ActiveModel::Serializers gem.
  # adapter: '_ams'
