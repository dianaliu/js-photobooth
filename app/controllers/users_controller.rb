class UsersController < ApplicationController
  def index
    @user = current_user || User.new
    render json: { :users => @user } if request.xhr?
  end

  def show
    @user = User.find(params[:id]) || User.new()
    render json: { :users => @user } if request.xhr?
  end
end
