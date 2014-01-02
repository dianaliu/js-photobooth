class PhotosController < ApplicationController
  def show
    @photo = Photo.find(params[:id])
  end

  def destroy
    photo = Photo.find(params[:id])
    @user = photo.user
    photo.destroy

    # Some browsers redirect using original method
    # API recommends returning 303 to use correct method
    # redirect_to root_path, status: 303
    # redirect_to root_path, status => 303

    render 'users/index', :layout => false
  end

  def tweet
    if current_user
      client = Twitter::REST::Client.new({
        :consumer_key => ENV['TWITTER_CONSUMER_KEY'],
        :consumer_secret => ENV['TWITTER_CONSUMER_SECRET'],
        :access_token => current_user.credentials[:token],
        :access_token_secret => current_user.credentials[:secret]
        })
      # Returns a tweet object.
      # http://rdoc.info/gems/twitter/Twitter/Tweet
      client.update("testing " + rand(100).to_s)
      render :nothing => true
    else
      redirect_to "/auth/twitter"
    end
  end
end
