var boxMaker = {};

boxMaker.buildHeader = function(sender) {
	
	headerDiv = document.createElement('div');
	headerDiv.className = 'header';

	if (sender !== undefined) {
		senderNode = document.createElement('p');
		senderNode.className = 'sender';
		senderNode.appendChild(document.createTextNode(sender));
		headerDiv.appendChild(senderNode);
	} 
	
	deleteAnchor = document.createElement('a');
	deleteAnchor.className = 'button';
	deleteAnchor.id = 'delete';

	headerDiv.appendChild(deleteAnchor);
	return headerDiv;  
};

boxMaker.buildContent = function(contentValue) {
	  contentDiv = document.createElement('div');
	  contentDiv.className = 'content';
	  content = contentProcessor.process(contentValue);
	  contentDiv.appendChild(content);
	  return contentDiv;
};

boxMaker.buildFooter = function(dateValue) {
	  footerDiv = document.createElement('div');
	  footerDiv.className = 'footer';
	  footerDiv.appendChild(document.createTextNode(dateValue));	
	  return footerDiv;
};

boxMaker.randomColumnClassname = function() {
	return 'col' +  Math.ceil( Math.random() * 3);
};

boxMaker.addHeaderBehavior = function(id, boxDiv) {
	
	$(boxDiv).find(".button").hide();
	
	$(boxDiv).mouseover(function() {
		$(this).find(".button").show();
	});
	  
	$(boxDiv).mouseout(function() {
		$(this).find(".button").hide();
	});
	
	$(boxDiv).find(".sender").click(function () {
		$("#textField").val($(this).html() + " ").focus();
		
	});
	
	$(boxDiv).find("#delete").click(function() {
	  
	  $.post("stick/delete/" + id)
	  .done(function(data) {
		  $("#container").masonry('remove', $(boxDiv));
	 	  $('#container').masonry('reloadItems');
		  $('#container').masonry('reload');		  
	  })
	  .fail(function() {
		  alert("Ocorreu uma falha");
	  });
	});	
};

boxMaker.make = function(id, contentValue, dateValue, sender) {
  var boxes = [];

  boxDiv = document.createElement('div');
  boxDiv.className = 'box shadow ' + this.randomColumnClassname();

  boxDiv.appendChild(this.buildHeader(sender));
  boxDiv.appendChild(this.buildContent(contentValue));
  boxDiv.appendChild(this.buildFooter(dateValue));

  this.addHeaderBehavior(id, boxDiv);
  
  boxes.push( boxDiv );
  return boxes;
};

