JsPhotobooth.Store = DS.Store.extend();
JsPhotobooth.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'js-photobooth'
});

// FIXME: this doesn't work
JsPhotobooth.ApplicationAdapter.on('QUOTA_EXCEEDED_ERR', function(records){
  Ember.$('#error').text('No more space in localStorage');
});