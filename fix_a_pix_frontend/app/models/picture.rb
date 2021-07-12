class Picture < ApplicationRecord
    #belongs_to :category
    has_many :puzzles
end
