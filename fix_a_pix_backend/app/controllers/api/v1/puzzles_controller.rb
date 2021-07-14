class Api::V1::PuzzlesController < ApplicationController

    def index
        puzzles = Puzzle.all
        render json: PuzzleSerializer.new(puzzles)
    end

    def create
        picture = Picture.find(params[:picture_id])
        puzzle = Puzzle.new(picture: picture, difficulty_level: params[:difficulty_level])
        if puzzle.save
            render json: puzzle, status: :accepted
        else
            puts puzzle.errors.full_messages
            render json: {errors: puzzle.errors.full_messages}, status: :unprocessible_entity
        end
    end

    private

    def puzzle_params
        params.require(:puzzle).permit(:picture, :difficulty_level)
    end

end