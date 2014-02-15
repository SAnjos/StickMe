class UserController < ApplicationController
  
  def self.find_user(login, password)
    User.find(:first, :conditions => ['(lower(name) = lower(?) or lower(email) = lower(?)) and password = ?', login, login, password ])
  end
     
  def login
    login = params[:login][:login]
    password = params[:login][:password]
    remember = params[:remember_me]
       
    user = UserController.find_user(login, password)
    
    if user.nil?
      flash[:error] = "User not found!"
      logger.info flash[:error]
      redirect_to_index 
      return 
    end

    if remember
      cookies[:user_name] = user.name
      cookies[:user_pass] = user.password
    end    
    user.rememberme = remember
    user.save
    
    set_logged_user(user.id)
    redirect_to_index
  end
  
  def logout
    clear_logged_user
    redirect_to_index
  end
  
  def logout_forever
    cookies[:user_name] = nil
    cookies[:user_pass] = nil
    logout
  end
  
  def change
    
  end
  
  def create
    name = params[:login][:name]
    password = params[:login][:password]
    email = params[:login][:email]
    
    user = User.create :name => name, :password => password, :email => email   
    
    set_logged_user(user.id)
    redirect_to_index
  end
  
end
