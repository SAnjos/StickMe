class MentionedUser < ActiveRecord::Base
  
  belongs_to :stick, :class_name => "Stick"
  belongs_to :user, :class_name => "User"

end
