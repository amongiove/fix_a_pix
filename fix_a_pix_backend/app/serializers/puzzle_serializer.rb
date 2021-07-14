class PuzzleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :difficulty_level, :picture
end
