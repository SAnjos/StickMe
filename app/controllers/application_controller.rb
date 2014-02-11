class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :user_authenticated?, :except => [ :index, :login ]
  skip_filter :verify_authenticity_token
  
  def logged_user
    unless session[:user].nil?
      logger.info "Usuario ja autenticado"
      return session[:user]
    end
    
    unless session[:user_id].nil?
      logger.info "Usuario ID ja identificado"
      user = User.find_by_id(session[:user_id])
      session[:user] = user
      return user
    end
    
    name = cookies[:user_name]
    pass = cookies[:user_pass]
    user_cookie = UserController.find_user(name, pass)
    unless (user_cookie.nil?)
      if (user_cookie.rememberme)
        logger.info "Autenticando usuario por cookie"
        session[:user] = user_cookie
        session[:user_id] = user_cookie.id
        return user_cookie 
      end  
    end
    
    return nil
  end

  def clear_logged_user
    logger.info "Limpando sessao de usuario"
    session[:user] = nil
    session[:user_id] = nil
  end
    
  def set_logged_user user_id
    if user_id.nil?
      return     
    end
     
    logger.info "set logged_user "
    logger.info user_id
    session[:user_id] = user_id
  end
   
  def redirect_to_index
    redirect_to :controller => :stick, :action => :index
  end
  
  protected 
    def user_authenticated?
      redirect_to_index if logged_user.nil?
    end
end
