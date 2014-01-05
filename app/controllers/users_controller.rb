class UsersController < ApplicationController

  def create
    @user = User.create(user_params)
    render json: { :users => @user } if request.xhr?
  end

  def index
    # Called on ember init to load user
    # TODO: Need to return user.photos, what format?
    @user = current_user || User.new
    render json: { :users => @user } if request.xhr?
  end

  def show
    # show 'profile' pages
    @user = User.find(params[:id])
    render json: { :users => @user } if request.xhr?
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
