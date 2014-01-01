# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Load development APP_CONFIG
app_config = File.join(Rails.root, 'config', 'app_config.rb')
load(app_config) if File.exists?(app_config)

# Initialize the Rails application.
Photobooth::Application.initialize!
