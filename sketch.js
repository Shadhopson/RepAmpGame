class rect_info {
	constructor(x,y,l,h,shape){
  	this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.s = shape;
  }
}

//setting parameters
var choose_game_rect = new rect_info(20,270,350,200,10);
var light_green = [0,250,0];
var choose_mimic_rect = new rect_info(choose_game_rect.x +3, choose_game_rect.y +60,225,40,10);
var eat_rect = new rect_info(150,350,120,40, 10);


function setup() {
  img = createImg('http://www.petwebsite.com/hamsters/hamsters_images/syrian-hamster_000008437184.jpg');
  img.hide();
  createCanvas(500, 500);
}


var scenes = ['Intro','Mimic', 'Mimic2','Mimic3', 'Noise'];
var scene = "Intro";
var mouse_in_box = function(x,y,l,h) {
  // returns if the mouse is in a box defined by an x,y
  // left corner, and a length and height
	return mouseX > x && mouseY > y && mouseX < x + l && 
    mouseY < y + h;
} 
  var in_mimic_box = function(x,y) {
  	return mouseX > x && mouseX < x + 220 &&  mouseY > y+60 && mouseY < y+100
  }
  var in_croc_box = function(x, y) {
  return mouseX > x && mouseX < x + 300 &&  mouseY > y+130 && mouseY < y+170
  }

	var game_choice_box = function (x,y){
	  fill(light_green);
		noStroke();
		rect(x,y,350,200, 10);
		fill(0,150,0);
		textSize(30);
		text("Choose A Game:",x+5,y + 40);
		strokeWeight(1);

    if (in_mimic_box(x,y)) {
			stroke(255,255,255);
    }
    else {
    	stroke(0,0,0);
    }
		fill(0,230,20);
		rect( choose_mimic_rect.x, choose_mimic_rect.y,
         choose_mimic_rect.l,choose_mimic_rect.h, 10);
	 	fill(0,150,0);
		text("Eat The Mimic!", x + 5, y + 90);
    if (in_croc_box(x,y)) {
			stroke(255,255,255);
    }
    else {
    	stroke(0,0,0);
    }
	  fill(0,230,20);
		rect( x + 3, y + 130, 330,40, 10);
	 	fill(0,150,0);
		text("The Crododile Goes...", x + 5, y + 160);
   // text(mouseX + " " + mouseY,mouseX,mouseY);
	}
  
  
	var draw_intro = function(){
  	background(0,200,0);
		x = 500/2-100;
		y = 90;
		noStroke();
		fill(0,200,200);
		rect(x-20,y-50,270,170, 10);
		fill(0,100,0);
		textSize(40);
		text("  Reptiles \n     And \nAmphibians!", x,y);
  }
var draw_mimic_intro = function(){
  background(0,0,50);
    fill(255,255,255);
    rect(30,30,420,400);
    fill(0);
    textSize(20);
    text(" You're a young predatory bird, new to\n hunting in an\
 area full of dangerous\n prey! Some are too dangerous to hunt,\n \
but some animals just mimic how the\n dangerous animals look!\
Can you tell\n the difference between a dangerous\n prey and the \
safe to eat mimic and\n fill your stomach?", 42,55);
    
    fill(255);
  	rect(eat_rect.x,eat_rect.y,eat_rect.l,eat_rect.h, eat_rect.s);
    fill(0);
    text("Let's Eat!", 160, 375);
}
  
function draw() {
  if (scene == "Intro"){
	  draw_intro();
		game_choice_box(20,270)
    //scene = "Mimic"
  }
  if (scene == "Mimic"){
    draw_mimic_intro();
  }
  if (scene == "Mimic2"){
  	background(0);
    image(img, 5,5,200,200);
  }
}


function mouseClicked() {
	if (scene == "Intro" && mouse_in_box(choose_mimic_rect.x, choose_mimic_rect.y, 
                                       choose_mimic_rect.l, choose_mimic_rect.h)){
  	scene = "Mimic";
  }
  if (scene == "Mimic" && mouse_in_box(eat_rect.x, eat_rect.y,
                                       eat_rect.l, eat_rect.h)){
    scene = "Mimic2";
  }
}
