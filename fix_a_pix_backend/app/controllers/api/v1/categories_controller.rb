class Api::V1::CategoriesController < ApplicationController

    def index
        categories = Category.all
        render json: CategorySerializer.new(categories)
    end

    def create
        category = Category.find_by(name: params[:name])
        if !category
            category = Category.new(category_params)
            if category.save
                render json: category, status: :accepted
            else
                render json: {errors: picture.errors.full_messages}, status: :unprocessible_entity
            end
        else
            render json: category, status: :accepted
        end
    end

    private

    def category_params
        params.require(:category).permit(:name)
    end

end