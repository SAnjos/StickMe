class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.integer :id
      t.string :name, :limit => 30, :null => false
      t.string :email, :email => true, :null => false
      t.string :password, :password => true, :limit => 10, :null => false
      t.boolean :admin, :defalut => false  
      t.boolean :rememberme, :default => true
      t.timestamps
    end
    
    User.create :name => "SAnjos", :email => "guilherme.sanjos@gmail.com", :password => "1234", :admin => true
    User.create :name => "Naomi", :email => "naomi@gmail.com", :password => "1234", :admin => false
    User.create :name => "SharedAccount", :email => "SharedAccount@stick4me.com", :password => "1234", :admin => false
  end

  def self.down
    drop_table :users
  end
end
