$(document).ready(function() {
	var source   = $("#my-template").html();
	var template = Handlebars.compile(source);
	var data = { colors: [
		{name: "red"},
		{name: "blue"},
		{name: "yellow"}
	]};
	$("#content").html(template(data));
});