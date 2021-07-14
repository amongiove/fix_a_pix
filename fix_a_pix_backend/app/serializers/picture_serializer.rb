class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :picture_url, :title, :category_id, :puzzles

end
