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
bushveldMim = new Animal("Bushveld Lizard", "bushveld", "An Excellent Meal!")
oogpisterMod =  new Animal("Oogpister Beetle", "oogpister", "Shoots Boiling Hot Noxious Chemicals Out Of Its Abdomen. Avoid!")
skarletkingMim = new Animal("Skarlet King Snake", "skarletking", "A Red Faced Meal That Likes To Hide Beneath Decaying Wood.")
coralMod = new Animal("Coral Snake", "coral", "One of the most venomous snakes in North America. Don't bother it.")

animals = {"redcheek":redcheekMod,"imitator":imitatorMim, "bushveld":bushveldMim,
"oogpister":oogpisterMod, "skarletking": skarletkingMim, "coral": coralMod};


var screenWidth = 975;
var  screenHeight = 650;
var health = 3;
var score = 0;
//setting parameters
//making rectangles
var light_green = [0,250,0];
var choose_game_rect = new rect_info(20,270,350,200,10);
var choose_mimic_rect = new rect_info(choose_game_rect.x +3, choose_game_rect.y +60,225,40,10);
var choose_croc_rect = new rect_info(choose_game_rect.x + 3, choose_game_rect.y + 130, 330, choose_mimic_rect.h, choose_mimic_rect.s);
var eat_rect = new rect_info(screenWidth/2 - 50,375,115,40, 10);
var anim1_rect = new rect_info((screenWidth -(2*340 +50))/2,100,340,400, 0);
var anim2_rect = new rect_info(anim1_rect.x+anim1_rect.l +50,anim1_rect.y, anim1_rect.l,anim1_rect.h,anim1_rect.s);
var mim2_ready_rect = new rect_info(screenWidth/2 -80, screenHeight -60, 160,40, 10);

var mimic_box = 0;
function setup() {
    for ( key in animals){
        var name = animals[key].filename;
        for (i = 1; i < 7; i++){
            animals[key].photos.push(loadImage("pictures/" + name + i + ".jpg"))
        }
    }
  var cnv = createCanvas(975, 650);
  var cx = (windowWidth - 975) / 2;
  var cy = (windowHeight -650) /2;
  cnv.position(cx,cy);
}

var scenes = ['Intro','Mimic', 'Mimic2','Mimic3', 'Noise'];
var scene = "Mimic";

// check if mouse in a box
var mouse_in_box = function(x,y,l,h) {
	return mouseX > x && mouseY > y && mouseX < x + l &&
    mouseY < y + h;
}
//  choosing a game box and choices
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
    var notewidth = 520;
    var note_x =  screenWidth/2 - notewidth/2;
    rect(note_x,30,notewidth,500);
    fill(0);
    textSize(25);
    text(" You're a young predatory bird, new to hunting in an\
 area full of dangerous prey! Some are too dangerous to hunt, \
but some animals just mimic how the dangerous animals look! \
Can you tell the difference between a dangerous prey and the \
safe to eat mimic and fill your stomach?", note_x + 75,75, 370);
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

var get_random_int =  function(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

var draw_animals = function(animal1, animal2, photoNum, ordered){
	var rand_num = 0;
	if (ordered || rand_num){
	   image(animals[animal1].photos[photoNum], anim1_rect.x,anim1_rect.y,anim1_rect.l,anim1_rect.h);
	   image(animals[animal2].photos[photoNum], anim2_rect.x,anim2_rect.y,anim2_rect.l,anim2_rect.h);
	}
	else {
	   image(animals[animal2].photos[photoNum], anim1_rect.x,anim1_rect.y,anim1_rect.l,anim1_rect.h);
	   image(animals[animal1].photos[photoNum], anim2_rect.x,anim2_rect.y,anim2_rect.l,anim2_rect.h);

	}
return rand_num

}

var draw_mimic_start_scene = function(){
        background(0,0,50);
   draw_animals('imitator', 'redcheek',0 ,true);
   textSize(30);
    fill(255);
    text("Mimic!", anim1_rect.x -20, anim1_rect.y -40)
    text("The Real Deal!", anim2_rect.x - 20, anim2_rect.y -40)

   textSize(25);
   text(animals["imitator"].name,anim1_rect.x, anim1_rect.y -5, anim1_rect.l);
   text(animals["redcheek"].name, anim2_rect.x, anim2_rect.y-5);
   bottomTextSize = 20;
   textSize(bottomTextSize);
  text(animals["imitator"].info, anim1_rect.x, anim1_rect.y + anim1_rect.h +bottomTextSize);
  text(animals["redcheek"].info, anim2_rect.x, anim2_rect.y + anim2_rect.h +bottomTextSize, anim2_rect.l);
 if (mouse_in_box(mim2_ready_rect.x, mim2_ready_rect.y, mim2_ready_rect.l,
             mim2_ready_rect.h)){
    fill(135,206,250);
 }
 else{
    noFill();
 }
  rect(mim2_ready_rect.x, mim2_ready_rect.y, mim2_ready_rect.l,mim2_ready_rect.h, mim2_ready_rect.s);
  fill(255);
  textSize(25);
  stroke(255);
  text("Ready?", mim2_ready_rect.x +30, mim2_ready_rect.y +30)
}
photo_counter =  1;
var draw_mimic_game = function(){
   background(0,0,50);
   draw_animals('imitator', 'redcheek',photo_counter ,false);


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
    draw_mimic_start_scene();
  }
  if(scene ==  "Mimic3"){
	  background(0);
	  draw_mimic_game();
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
  if (scene == "Mimic2" && mouse_in_box(mim2_ready_rect.x,
          mim2_ready_rect.y, mim2_ready_rect.l, mim2_ready_rect.h)){
    scene = "Mimic3";
  }
  if ( scene == "Mimic3"){
 	if (mouse_in_box(anim1_rect.x, anim1_rect.y, anim1_rect.l,
		       anim1_rect.h)){

	}



  }

}
