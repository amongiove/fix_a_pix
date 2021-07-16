class PictureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :picture_url, :category

end
