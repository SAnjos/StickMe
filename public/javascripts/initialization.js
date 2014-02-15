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
      url: "stick/new",
      data: { sentence: content },
      success: function(data) {
  			newBox(data.id, data.content, data.creationDate);
  		    $textField.val('');
  		    $textField.focus();
      }
    });
}

function initializePiro() {
	setPirobox(not_logged, function() {
		$("create_account_area").hide();
		
		$('#login_column').hide().fadeIn(2000);
		$('#signup_column').hide().fadeIn(1500);
		$('#test_column').hide().fadeIn(1000);
		$('#login_login').focus();
		$("#test_account").click(function() {
			$("#test_account_form").submit();
		});
		
		$('.create_account').click(function () {
			$('#login_column').fadeOut(500);
			$('#signup_column').fadeOut(500);
			$('#test_column').fadeOut(500);	
			$('#columns').fadeOut(600, function() {
				$('#create_account_area').show().hide().fadeIn(1000);
				$('#login_name').focus();
			});
		});
	});
	
	$('#abreLogin').click();
}
