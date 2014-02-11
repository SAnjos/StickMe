module StickHelper
  
  def create_return_string_for_new_stick(stick)
    #example: {"id":1,"content":"asd","creationDate":1390966312716}
    return "{\"id\":#{stick.id},\"content\":\"#{stick.content.to_s}\", \"creationDate\":\"#{l(stick.created_at, :format => :short)}\"}"
  end
  
end
