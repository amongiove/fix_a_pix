class CreatePuzzles < ActiveRecord::Migration[6.1]
  def change
    create_table :puzzles do |t|
      t.integer :difficulty_level
      t.belongs_to :picture

      t.timestamps
    end
  end
end
