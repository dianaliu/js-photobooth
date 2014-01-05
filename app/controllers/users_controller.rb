class UsersController < ApplicationController

  def create
    @user = User.create(user_params)
    render json: { :users => @user } if request.xhr?
  end

  def index
    @user = current_user || User.new
    render json: { :users => @user } if request.xhr?
  end

  def show
    @user = User.find(params[:id]) || User.new()
    render json: { :users => @user } if request.xhr?
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
