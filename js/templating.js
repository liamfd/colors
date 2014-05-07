$(document).ready(function() {

    _.templateSettings.variable = "rc";

    // Grab the HTML out of our template tag and pre-compile it.
    var template = _.template(
        $( "script#my-template" ).html()
    );

	var data = { colors: [
		{name: "red"},
		{name: "blue"},
		{name: "yellow"}
	]};

	$("#primary-colors").html(
		template(data)
	);

/*	var source   = $("#my-template").html();
	var template = Handlebars.compile(source);
	console.log(source);
	var data = { colors: [
		{name: "red"},
		{name: "blue"},
		{name: "yellow"}
	]};
	$("#primary-color-list").html(template(data));
*/
});