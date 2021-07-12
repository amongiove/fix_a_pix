class Api::V1::PicturesController < ApplicationController

    def index
        pictures = Picture.all
        # options = {
        #     include: [:puzzles, :category] 
        # } -- would pass in options below if using this
        render json: PictureSerializer.new(pictures)
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
