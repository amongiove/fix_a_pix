require 'pexels'

class Api::V1::PicturesController < ApplicationController

    def index
        pictures = Picture.all
        # options = {
        #     include: [:puzzles, :category] 
        # } -- would pass in options below if using this
        render json: PictureSerializer.new(pictures)
    end

    def search
        keyword = params[:keyword]
        client = Pexels::Client.new('563492ad6f91700001000001a28dec988d85416a9cf80775977cb110')
        #TODO hide auth code in .env file
        #TODO make so dont have to create new client each time
        photos = client.photos.search(keyword, per_page: 5)
        puts photos
        # pexelPics = []
        # photos.each do |photo|
        #     pexelPics << photo.url
        # end
        #TODO move this functionality into different model
        render json: photos
    end

    def create
        picture = Picture.new(picture_params)
        if picture.save
            render json: picture, status: :accepted
        else
            render json: {errors: picture.errors.full_messages}, status: :unprocessible_entity
        end
    end

    private

    def picture_params
        params.require(:picture).permit(:picture_url, :title, :category_id)
    end

end
