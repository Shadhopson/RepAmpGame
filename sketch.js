//set classes
class rect_info {
	constructor(x,y,l,h,shape){
  	this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.s = shape;
  }
}
class Animal {
	constructor(name,filename, info){
		this.name = name;
		this.filename = filename;
		this.info = info;
	  	this.photos = [];	
	}
}

//make animals
imitatorMim = new Animal("Imitator Salamander", "imitator", "Poison Free And Oh So Tasty!");
redcheekMod = new Animal("Red-Cheeked Salamander", "redcheek", "Releases Poisonous Secretions From It's Skin. Don't Eat It!");

animals = {"redcheek":redcheekMod,"imitator":imitatorMim};

//setting parameters
//making rectangles
var light_green = [0,250,0];
var choose_game_rect = new rect_info(20,270,350,200,10);
var choose_mimic_rect = new rect_info(choose_game_rect.x +3, choose_game_rect.y +60,225,40,10);
var choose_croc_rect = new rect_info(choose_game_rect.x + 3, choose_game_rect.y + 130, 330, choose_mimic_rect.h, choose_mimic_rect.s);
var eat_rect = new rect_info(200,375,100,40, 10);
var anim1_rect = new rect_info(70,100,170,200, 0);
var anim2_rect = new rect_info(260,anim1_rect.y, anim1_rect.l,anim1_rect.h,anim1_rect.s);

function setup() {
    for ( key in animals){
        var name = animals[key].filename;
        for (i = 1; i < 7; i++){
            animals[key].photos.push(loadImage("pictures/" + name + i + ".jpg"))
        }
    }
  createCanvas(500, 500);
}

var scenes = ['Intro','Mimic', 'Mimic2','Mimic3', 'Noise'];
var scene = "Mimic2";

// check if mouse in a box
var mouse_in_box = function(x,y,l,h) {
	return mouseX > x && mouseY > y && mouseX < x + l && 
    mouseY < y + h;
} 
//  choosing a game box and choises
var game_choice_box = function (){
    fill(light_green);
	noStroke();
	rect(choose_game_rect.x,choose_game_rect.y,choose_game_rect.l,choose_game_rect.h, choose_game_rect.s);
	fill(0,150,0);
	textSize(30);
	text("Choose A Game:", choose_game_rect.x+5,choose_game_rect.y + 40);
	strokeWeight(1);

    // MIMIC BOX
    if (mouse_in_box(choose_mimic_rect.x,choose_mimic_rect.y,choose_mimic_rect.l,choose_mimic_rect.h, choose_mimic_rect.s)) {
			stroke(255,255,255);
    }
    else {
    	stroke(0,0,0);
    }
		fill(0,230,20);
		rect( choose_mimic_rect.x, choose_mimic_rect.y,
         choose_mimic_rect.l,choose_mimic_rect.h, 10);
	 	fill(0,150,0);
		text("Eat The Mimic!", choose_mimic_rect.x + 3, choose_mimic_rect.y + 30);

    // CROC BOX
    if (mouse_in_box(choose_croc_rect.x, choose_croc_rect.y, choose_croc_rect.l, choose_croc_rect.h)) {
			stroke(255,255,255);
    }
    else {
    	stroke(0,0,0);
    }
	  fill(0,230,20);
		rect( choose_croc_rect.x, choose_croc_rect.y, choose_croc_rect.l,choose_croc_rect.h, choose_croc_rect.s);
	 	fill(0,150,0);
		text("The Crocodile Goes...", choose_croc_rect.x + 3, choose_croc_rect.y + 30);
}
  
//background of intro screen  
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

// MIMIC GAME INTRO
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
    if (mouse_in_box(eat_rect.x,eat_rect.y,eat_rect.l,eat_rect.h)){
        fill(135,206,250);
    }
    else{  
        fill(255);
    }
  	rect(eat_rect.x,eat_rect.y,eat_rect.l,eat_rect.h, eat_rect.s);
    fill(0);
    text("Let's Eat!", eat_rect.x + 3, eat_rect.y + 30);
}
  
var draw_mimic_start_scene = function(){
   image(animals['imitator'].photos[0], anim1_rect.x,anim1_rect.y,anim1_rect.l,anim1_rect.h);
   image(animals["redcheek"].photos[0], anim2_rect.x,anim2_rect.y,anim2_rect.l,anim2_rect.h);
}

function draw() {
  if (scene == "Intro"){
	  draw_intro();
		game_choice_box()
  }
  if (scene == "Mimic"){
    draw_mimic_intro();
  }
  if (scene == "Mimic2"){
  	background(0);
    draw_mimic_start_scene();
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
