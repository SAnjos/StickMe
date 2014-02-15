class User < ActiveRecord::Base
  validates_uniqueness_of :name, :message => "User name already taken"
  validates_uniqueness_of :email, :message => "Email already used"
end
