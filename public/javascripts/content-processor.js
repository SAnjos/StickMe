var contentProcessor = {};

contentProcessor.process = function(content) {
	dateTags = this.selectDates(content);
	timeTags = this.selectTimes(content);

	var divContent = document.createElement("div");
	content = this.createTagNode(content, divContent, dateTags, "date", 'p');
	content = this.createTagNode(content, divContent, timeTags, "time", 'p');
	
	this.createContentNode(content, divContent);
	return divContent;
};

contentProcessor.getTag = function(content, start) {
	if (start == null)
		start = 0;
	
	next = content.indexOf("#", start);
	endOfToken = content.indexOf(" ", next);
	if (endOfToken == -1)
		token = content.substring(next);
	else
		token = content.substring(next, endOfToken);
	
	return token.replace("#", "");
};

contentProcessor.createContentNode = function(content, divContent) {
	
	actual = 0;
	
	while (content.indexOf("#", actual) != -1) {
		next = content.indexOf("#", actual);
		text = content.substring(actual, next);
		divContent.appendChild(document.createTextNode(text));

		token = this.getTag(content, actual);
		if (token == "link") {
			tokenNode = document.createElement("a");
			tokenNode.href = "http://google.com";
			tokenNode.target = "_blank";
			tokenNode.appendChild(document.createTextNode(token));			
		} else {
			tokenNode = document.createElement("b");
			tokenNode.appendChild(document.createTextNode(token));
		}
		divContent.appendChild(tokenNode);
		
		actual = next + token.length + 1;
	}

	if (actual < content.length) {
		text = content.substring(actual);
		divContent.appendChild(document.createTextNode(text));
	}	
};

contentProcessor.createTagNode = function (content, divContent, tags, nodeClassName, nodeType) {
	content = this.removeTags(tags, content);
	
	for (var i = 0; i < tags.length; i++) {
		texto = tags[i].replace("#","");
		node = this.createNode(texto, nodeType, nodeClassName);
		divContent.appendChild(node);
	}
	
	return content;
};

contentProcessor.createNode = function (content, nodeType, cssClass) {
	node = document.createElement(nodeType);
	node.className = cssClass;
	node.appendChild(document.createTextNode(content));
	return node;
	
};

contentProcessor.select = function(text, regexp) {
	reg = new RegExp(regexp, 'g');
	var tags = text.match(reg);
	if (tags == null || tags.length == 0)
		return new Array();
	else
		return tags;
};

contentProcessor.selectDates = function(content) {
	return this.select(content, '[#][0-9]{1,2}[/][0-9]{1,2}');
};

contentProcessor.selectTimes = function(content) {
	return this.select(content, '[#][0-9]{1,2}[:][0-9]{1,2}');
};

contentProcessor.selectLinks = function(content) {
	return this.select(content, '[#][l][i][n][k]');
};

contentProcessor.removeTags = function(tags, content) {
	var result = content;
	for (var i = 0; i < tags.length; i++)
		result = result.replace(tags[i], "");
	
	return result;
};