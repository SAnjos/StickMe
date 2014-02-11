class CreateMentionedUsers < ActiveRecord::Migration
  def self.up
    create_table :mentioned_users do |t|
      t.belongs_to :user, :index => true
      t.belongs_to :stick, :index => true
      t.timestamps
    end
  end

  def self.down
    drop_table :mentioned_users
  end
end
