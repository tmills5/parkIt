class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :content
      t.integer :user_id
      t.integer :park_id

      t.timestamps
    end
  end
end
