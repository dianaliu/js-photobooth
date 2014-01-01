class WelcomeController < ApplicationController
  def index
    if current_user
      @client = Twitter::Streaming::Client.new({
          :consumer_key => "gsUzh9tcPNATjYHm8zu1A",
          :consumer_secret => "7LjesrGt8mLvTm30X9Hxi5HhvJBOe13htwqaw4Hok",
          :access_token => current_user.credentials[:token],
          :access_token_secret => current_user.credentials[:secret]
        })

      ap @client
    end
  end

  def
end
