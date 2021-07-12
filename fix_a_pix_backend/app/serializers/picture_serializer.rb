class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :picture_url, :title, :category_id, :puzzles
  # add these associations if passing in options
  # has_many :puzzles
  # belongs_to :category

end
