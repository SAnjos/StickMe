class StickController < ApplicationController
  include StickHelper
  
  def index    
    @logged_user = logged_user
    if @logged_user.nil?
      @my_sticks = []
      return 
    end
    @my_sticks = MentionedUser.where( :user_id => logged_user).collect { |uis| uis.stick } 
  end
  
  def create_mentions_for (creator_user, stick, content)
    MentionedUser.create :user => creator_user, :stick => stick
    
    # /@[\S]+/ words starting @ ending with space
    content.scan(/@[\S]+/).each do |mentioned_user|
      mentioned_user.slice!(0)     
      user = User.find(:first, :conditions => ["lower(name) = lower(?)", mentioned_user])
      unless user.nil?
        MentionedUser.create :user => user, :stick => stick
      end
    end   
  end
     
  def new
    content = params[:sentence]
    
    stick = Stick.create :content => content, :user => logged_user
    create_mentions_for(logged_user, stick, content)
    
    result = create_return_string_for_new_stick(stick)
    render :text => result, :status => 200, :content_type => :text
  end
  
  def delete
    stick_id = params[:id]
    mentions = MentionedUser.where(:stick_id => stick_id)
    
    mentions.each do |mention| 
      if mention.user == logged_user
        mention.delete
      end
    end
    
    Stick.delete(:id => stick_id) if mentions.empty?
        
    render :nothing => true, :status => 200
  end
  
end
