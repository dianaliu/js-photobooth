class Photo < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :url, :user_id
end
