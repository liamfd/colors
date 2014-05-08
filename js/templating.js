var primary_color_data = { colors: [
	{name: "red", val:"#990000"},
	{name: "blue", val:"#000099"},
	{name: "green", val:"#009900"},
	{name: "yellow", val:"#999900"}
]};

var secondary_color_data = { colors: [
	{name: "black", val:"#000000"},
	{name: "white", val:"#ffffff"},
	{name: "grey", val:"#808080"},
	{name: "opposite", val:"#009999"}
]};
var test;
var primary_color;
var secondary_color;


$(document).ready(function() {
    _.templateSettings.variable = "rc";

    // Grab the HTML out of our template tag and pre-compile it.
    var template = _.template(
        $( "script#color-template" ).html()
    );

    //set default color values in js and DOM
    primary_color = primary_color_data.colors[0].val;
    secondary_color = secondary_color_data.colors[0].val;
	setOppositeColor(primary_color, template);
    setCenterCircle();

    //click template and set click listener for primary
	$("#primary-colors").html(
		template(primary_color_data)
	).on("click",".color-circle", function(e){
		var el = e.target;
		primary_color = el.dataset.color;
		setOppositeColor(primary_color, template);
		setCenterCircle();
	});

	//template and set click listener for secondary
	$("#secondary-colors").html(
		template(secondary_color_data)
	).on("click",".color-circle", function(e){
		var el = e.target;
		secondary_color = el.dataset.color;
	});

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

//recursive, calls itself every second
function incr_loader(step){
	num_seconds = 20;
	if (step <= num_seconds){
		return function(){
			place = (step/num_seconds)*100;
			$(".loader").val(place).trigger('change');
			console.log(step);
			setTimeout(incr_loader(step+1, num_seconds), 1000);
		};
	}
}

//takes in a color and a template, gets its opposite, saves that and uses it in template
function setOppositeColor(color, template){
	var opposite_color = _.find(secondary_color_data.colors, function(color){return color.name == "opposite";});
	opposite_color.val=oppositeColor(color);
	$("#secondary-colors").html(
		template(secondary_color_data)
	);
}

//takes in a color string, and returns an opposite color
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

function setCenterCircle(){
	$(".main-circle").css("background-color",primary_color);
}