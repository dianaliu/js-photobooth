class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.text :url
      t.string :user_id

      t.timestamps
    end
  end
end
