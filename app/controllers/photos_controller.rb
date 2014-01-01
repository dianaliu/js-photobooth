class PhotosController < ApplicationController
  def show
  end

  def destroy
    photo = Photo.find(params[:id])
    photo.destroy

    render json: photo
  end
end
