var primary_color_data = { colors: [
	{name: "red", val:"#d41a33"},
	{name: "blue", val:"#3854ad"},
	{name: "green", val:"#37b33f"},
	{name: "yellow", val:"#f5ee0a"}
]};

var secondary_color_data = { colors: [
	{name: "black", val:"#000000"},
	{name: "white", val:"#ffffff"},
	{name: "grey", val:"#808080"},
	{name: "opposite", val:"#009999"}
]};
var test;
var primary_color_name;
var secondary_color_name;


$(document).ready(function() {
    _.templateSettings.variable = "rc";
    var primary_color_group = $("#primary-colors");
    var secondary_color_group = $("#secondary-colors");

    // Grab the HTML out of our template tag and pre-compile it.
    var template = _.template(
        $( "script#color-template" ).html()
    );

    //set default color values in js and DOM
    primary_color_name = primary_color_data.colors[0].name;
    secondary_color_name = secondary_color_data.colors[0].name;
	setOppositeColor(getPrimaryColor(primary_color_name), template);
    setCenterCircle(getPrimaryColor(primary_color_name).val);



    //click template and set click listener for primary
	primary_color_group.html(
		template(primary_color_data)
	).on("click",".color-circle", function(e){
		var el = e.target;
		primary_color_name = el.dataset.name;
		//primary_color = _.find(primary_color_data.colors, function(color){return color.name == primary_color_name;}).val;

		//set visual styles of chosen color circles
		primary_color_group.find(".color-circle").removeClass("large-color-circle");
		$(el).addClass("large-color-circle");

		//save the color, set the center circle color
		setOppositeColor(getPrimaryColor(primary_color_name), template);
		setCenterCircle(getPrimaryColor(primary_color_name).val);
	});

	//template and set click listener for secondary
	secondary_color_group.html(
		template(secondary_color_data)
	).on("click",".color-circle", function(e){
		var el = e.target;
		secondary_color_name = el.dataset.name;
		//secondary_color = _.find(secondary_color_data.colors, function(color){return color.name == secondary_color_name;}).val;

		//set visual styles of chosen color circles
		secondary_color_group.find(".color-circle").removeClass("large-color-circle");
		$(el).addClass("large-color-circle");
	});

	//set default color options visually for the first elements of each list
	primary_color_group.find(".color-circle").first().addClass("large-color-circle");
	secondary_color_group.find(".color-circle").first().addClass("large-color-circle");



	//knob data
	$('.loader').knob({
		'readOnly':true,
		'width':"200",
		'displayInput':false,
		'fgColor':"#909090"
	});

	$(".loader").knob({
		'change' : function(v) {console.log(v); }
	});

	$(".action").click(function(e){
		setTimeout(incr_loader(0), 0); //calls the recursive timeout function
	});


});

//recursive, calls itself every second. This is a mess.
function incr_loader(step){
	num_seconds = 1;
	if (step <= num_seconds){
		return function(){
			place = (step/num_seconds)*100;
			$(".loader").val(place).trigger('change');
			console.log(step);
			setTimeout(incr_loader(step+1, num_seconds), 1000);
		};
	}
	else{
		setCenterCircle(getSecondaryColor(secondary_color_name).val);
	}
}

//takes in a color and a template, gets its opposite, saves that and uses it in template
function setOppositeColor(color, template){
	var opposite_color = _.find(secondary_color_data.colors, function(color){return color.name == "opposite";});

	opposite_color.val = oppositeColor(color.val);
	
	var opposite_element = $("#secondary-colors").find(".color-circle").last(); //opposite is always last
	console.log(opposite_element);
	opposite_element.css("background-color",opposite_color.val);

	//$("#secondary-colors").html(
	//	template(secondary_color_data)
	//);
}

//takes in a color string value, and returns an opposite color
function oppositeColor(in_color){
	var max_color_val = 255;
	var out_color = "#";
	for (var i =1; i <7; i+=2){
		var in_color_seg = parseInt(in_color.substring(i,i+2),16);
		var out_color_seg = (max_color_val-in_color_seg).toString(16);
		if (out_color_seg.length < 2){
			out_color_seg = "0" + out_color_seg;
		}
		out_color += out_color_seg;
	}
	return out_color;
}

function setCenterCircle(color){
	$(".main-circle").css("background-color",color);
}


//return color object, not value
function getPrimaryColor(color_name){
	return _.find(primary_color_data.colors, function(color){return color.name == color_name;});
}

function getSecondaryColor(color_name){
	return _.find(secondary_color_data.colors, function(color){return color.name == color_name;});
}