class UsersController < ApplicationController
  def index
    @user = current_user

    # if current_user
    #   @client = Twitter::Streaming::Client.new({
    #       :consumer_key => ENV['TWITTER_CONSUMER_KEY'],
    #       :consumer_secret => ENV['TWITTER_CONSUMER_SECRET'],
    #       :access_token => current_user.credentials[:token],
    #       :access_token_secret => current_user.credentials[:secret]
    #     })
    # end
  end

  def show
    @user = User.find(params[:id])
  end
end
