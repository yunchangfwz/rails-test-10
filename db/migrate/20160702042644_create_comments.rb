class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :comments, :parent, index: true
      t.references :user, index: true 
      t.text :message
      t.timestamps null: false
    end
  end
end
