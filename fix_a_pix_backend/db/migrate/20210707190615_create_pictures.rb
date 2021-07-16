class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures do |t|
      t.string :picture_url
      t.belongs_to :category

      t.timestamps
    end
  end
end
