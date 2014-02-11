class CreateSticks < ActiveRecord::Migration
  def self.up
    create_table :sticks do |t|
      t.string :content, :limit => 200
      t.belongs_to :user, :index => true
      t.integer :color, :default => 0, :limit => 1
      t.timestamps
    end
  end

  def self.down
    drop_table :sticks
  end
end
