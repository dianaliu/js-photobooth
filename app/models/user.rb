class User < ActiveRecord::Base
  serialize :credentials

  has_many :photos

  def self.from_omniauth(auth)
    where(auth.slice("provider", "uid")).first || create_from_omniauth(auth)
  end

  def self.create_from_omniauth(auth)
    User.create!({ :provider => auth["provider"],
      :uid => auth["uid"],
      :name => auth["info"]["nickname"],
      :credentials =>  {
        :token => auth["credentials"]["token"],
        :secret => auth["credentials"]["secret"]
      }
    })
  end

end
