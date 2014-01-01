# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create(:name => "diana")
["http://i.imgur.com/sUbmbt9.jpg", "http://i.imgur.com/KZ76RDI.jpg", "http://i.imgur.com/l8BK4qX.jpg", "http://i.imgur.com/ZyILSp9.jpg"].each do |doge|
  user.photos.create(:url => doge)
end
