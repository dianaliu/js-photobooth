class UsersController < ApplicationController
  def index
    @user = current_user || User.new
    render json: @user if request.xhr?
  end

  def show
    @user = User.find(params[:id])
  end
end
