require 'pexels'

class Api::V1::PicturesController < ApplicationController

    def index
        pictures = Picture.all
        render json: PictureSerializer.new(pictures)
    end

    def create
        puts "inside picture create"
        puts params
        picture = Picture.new(picture_params)
        if picture.save
            render json: picture, status: :accepted
        else
            render json: {errors: picture.errors.full_messages}, status: :unprocessible_entity
        end
    end

    # def random
    #     #generate random pic if user selects
    #     client = Pexels::Client.new('563492ad6f91700001000001a28dec988d85416a9cf80775977cb110')
    #     random = client.photos.curated(per_page: 5)

    #   render json: random
    # end

    def search
        keyword = params[:keyword]
        client = Pexels::Client.new('563492ad6f91700001000001a28dec988d85416a9cf80775977cb110')
            #move this so don't need new client each time
            #  #TODO hide auth code in .env file  
        photos = client.photos.search(keyword, per_page: 5)
        
        render json: photos
    end

    private

    def picture_params
        params.require(:picture).permit(:picture_url, :title, :category_id)
    end



end
