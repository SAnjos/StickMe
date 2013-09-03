var $container = $('#container');
var $textField = $('#textField');

$container.masonry({
	  itemSelector: '.box',
	  columnWidth: 100,
      isAnimated: true
});

function newBox(id, contentValue, dateValue, sender) {
    if (contentValue.length > 0) {
		var boxes = $( boxMaker.make(id, contentValue, dateValue, sender));
		$container.append(boxes).masonry( 'appended', boxes );
    }
}

$('#sendButton').click(function(){
	createPostage($textField.val());
});

$textField.keypress(function (e) {
	if (e.which === 13)
		createPostage($textField.val());
});    

function createPostage(content) {
    if (content.length == 0)
    	return;
    
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "stick/sequence",
      data: { sentence: content },
      success: function(data) {
  			newBox(data.id, data.content, data.creationDate);
  		    $textField.val('');
  		    $textField.focus();
      }
    });
}
