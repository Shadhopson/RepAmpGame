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

animals = {"redcheek":redcheekMod,"imitator":imitatorMim, "bushveld":bushveldMim,"oogpister":oogpisterMod, "skarletking": skarletkingMim, "coral": coralMod};
'skarletkingMim'

var screenWidth = 975;
var  screenHeight = 650;
var health = 5;
var score = 0;
var change = true;
var photo_counter =  1;
var chosen = false;
var timer = 100;
var scenes = ['Intro','Mimic', 'Mimic2','Mimic3', 'Noise'];
var scene = "Mimic";
var is_mimic_first = 0;
var pair_count = 0;
var animal_pair = [["bushveld","oogpister"],["imitator", "redcheek"],["skarletking","coral"]];
var white  = [255,246,238];
var orange = [219,131,96];
var light_orange = [255, 152, 112];
var light_red = [178,72,61];
var purple = [88,47,59];
var light_green = [151,185,138];
var light_purple = [176,94,118];
var showRect = false;
//setting parameters
//making rectangles
//var light_green = [0,250,0];
var choose_game_rect = new rect_info(20,270,350,200,10);
var choose_mimic_rect = new rect_info(choose_game_rect.x +3, choose_game_rect.y +60,225,40,10);
var choose_croc_rect = new rect_info(choose_game_rect.x + 3, choose_game_rect.y + 130, 330, choose_mimic_rect.h, choose_mimic_rect.s);
var eat_rect = new rect_info(screenWidth/2 - 70,screenHeight - 175,115,40, 10);
var anim1_rect = new rect_info((screenWidth -(2*340 +50))/2,100,340,400, 0);
var anim2_rect = new rect_info(anim1_rect.x+anim1_rect.l +50,anim1_rect.y, anim1_rect.l,anim1_rect.h,anim1_rect.s);
var mim2_ready_rect = new rect_info(screenWidth/2 -80, screenHeight -70, 140,40, 10);
var restart_rect =  new rect_info(835,550,90,50, 10);

var mimic_box = 0;
function setup() {
    for ( key in animals){
        var name = animals[key].filename;
        for (i = 1; i < 7; i++){
            animals[key].photos.push(loadImage("pictures/" + name + i + ".jpg"))
        }
    }
	bird = loadImage("pictures/bird.png")
	goodEndImg = loadImage("pictures/birdgoodend.png")
	badEndImg = loadImage("pictures/birdbadend.png")
  var cnv = createCanvas(975, 650);
  var cx = (windowWidth - 975) / 2;
  var cy = (windowHeight -650) /2;
  cnv.position(cx,cy);
}


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
var flockX = -200;
var flockY = -200;
var flockChangeX = 0.5;
var flockChangeY = 0.2;
var flockAccX = 0.007;
var flockAccY = 0.005;
var draw_mimic_intro = function(){
    background(purple);
    fill(white);
    var notewidth = 520;
		var noteheight = 500;
    var note_x =  screenWidth/2 - notewidth/2;
		var note_y = screenHeight/2 - noteheight/2;
		if (Math.abs(flockChangeX) > 1.5){
			flockAccX *= -1;
		}
		if (Math.abs(flockChangeY) > 1.5){
			flockAccY *= -1;
		}
		flockChangeY += flockAccY
		flockChangeX += flockAccX;
		flockX += flockChangeX;
		flockY+= flockChangeY;
		image(goodEndImg, flockX,flockY, screenWidth, screenHeight);
    rect(note_x,note_y,notewidth,noteheight);
		fill(white);
		textSize(25);
		text("CAN YOU...", screenWidth/2-250, 25);
		textSize(45);
		text("CATCH-THE-MIMIC!", screenWidth/2-200, 70);
    fill(0);
    textSize(25);
    text(" You're a migrating predatory bird, hunting in a\
 new area full of dangerous creatures! Some are too dangerous to hunt, \
but some animals just mimic how the dangerous ones look! \
Can you tell the difference between the hazardous creatures and their \
safe to eat mimics and fill your stomach?", note_x + 75,note_y + 75, 400);
    if (mouse_in_box(eat_rect.x,eat_rect.y,eat_rect.l,eat_rect.h)){
        fill(light_green);
    }
    else{
        fill(orange);
    }
		stroke(purple);
		strokeWeight(3);
  	rect(eat_rect.x,eat_rect.y,eat_rect.l,eat_rect.h, eat_rect.s);
    fill(0);
		noStroke();
    text("Let's Eat!", eat_rect.x + 5, eat_rect.y + 30);
}

var get_random_int =  function(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

var draw_animals = function(animal1, animal2, photoNum, ordered){
	//image(goodEndImg, 0,0, screenWidth, screenHeight);
	var rand_num = 0;
	if (ordered || is_mimic_first){
	   image(animals[animal1].photos[photoNum], anim1_rect.x,anim1_rect.y,anim1_rect.l,anim1_rect.h);
	   image(animals[animal2].photos[photoNum], anim2_rect.x,anim2_rect.y,anim2_rect.l,anim2_rect.h);
	}
	else {
	   image(animals[animal2].photos[photoNum], anim1_rect.x,anim1_rect.y,anim1_rect.l,anim1_rect.h);
	   image(animals[animal1].photos[photoNum], anim2_rect.x,anim2_rect.y,anim2_rect.l,anim2_rect.h);

	}


}

var draw_mimic_start_scene = function(animal1, animal2){
    background(purple);
    draw_animals(animal1, animal2,0 ,true);
    textSize(30);
    fill(white);
    text("Mimic!", anim1_rect.x -20, anim1_rect.y -40)
    text("The Real Deal!", anim2_rect.x - 20, anim2_rect.y -40)

   textSize(25);
   text(animals[animal1].name,anim1_rect.x, anim1_rect.y -5, anim1_rect.l);
   text(animals[animal2].name, anim2_rect.x, anim2_rect.y-5);
   bottomTextSize = 20;
   textSize(bottomTextSize);
  text(animals[animal1].info, anim1_rect.x, anim1_rect.y + anim1_rect.h +bottomTextSize, anim1_rect.l);
  text(animals[animal2].info, anim2_rect.x, anim2_rect.y + anim2_rect.h +bottomTextSize, anim2_rect.l);
 if (mouse_in_box(mim2_ready_rect.x, mim2_ready_rect.y, mim2_ready_rect.l,
             mim2_ready_rect.h)){
    fill(orange);
 }
 else{
	  fill(white);
 }
  rect(mim2_ready_rect.x, mim2_ready_rect.y, mim2_ready_rect.l,mim2_ready_rect.h, mim2_ready_rect.s);
  fill(purple);
  textSize(25);
  //stroke(255);
  text("Ready?", mim2_ready_rect.x +30, mim2_ready_rect.y +30)
}

var draw_button = function(){
	if (mouse_in_box(mim2_ready_rect.x, mim2_ready_rect.y, mim2_ready_rect.l,
              mim2_ready_rect.h)){
     fill(orange);
  }
  else{
     fill(white);
  }
   rect(mim2_ready_rect.x, mim2_ready_rect.y , mim2_ready_rect.l,mim2_ready_rect.h, mim2_ready_rect.s);
   fill(purple);
   textSize(25);
   stroke(255);
   text("Ready?", mim2_ready_rect.x +30, mim2_ready_rect.y +30)
 }

var draw_heart = function(x,y){
	smooth();
	noStroke();
	//fill(255,0,0);
	fill(light_red);
	beginShape();
	vertex(x+50, y+15);
	bezierVertex(x+50, y-5, x+90, y+5, x+50, y+40);
	vertex(x+50, y+15);
	bezierVertex(x+50, y-5, x+10, y+5, x+50, y+40);
	endShape();
}
var correct = true;
var draw_mimic_game = function(animal1, animal2){
	 timer -= 0.1;
   background(purple);
	 fill(255);
   draw_animals(animal1, animal2,photo_counter ,false);
	 //text(mouseX +', ' + mouseY, mouseX, mouseY);
	 for (var i = 0; i < health; i++){
	    draw_heart(90 + i*50, 25);
   }
	 textSize(40);
	 fill(white);
	 text("Fullness: "+Math.round((score *(2/3))) + "%",630,60);
	 var upper_text_x = anim1_rect.x+150;
	 var upper_text_y = anim1_rect.y +450;
	 var extra = 100;
	 textSize(30);
	 if (chosen && timer > 10){
		 draw_button();
		 fill(white);
      if(correct){
				timer = 100;
				text("Tasty! Nice Catch!", upper_text_x +100, upper_text_y);
				noFill();
				strokeWeight(20);
				stroke(light_green);
				rect(showRect.x, showRect.y, showRect.l, showRect.h);
				strokeWeight(1);
			}
			else{
				timer = 100;
				text("Ouch! Don't eat that!",upper_text_x+100, upper_text_y);
				noFill();
				strokeWeight(20);
				stroke(light_red);
				rect(showRect.x, showRect.y, showRect.l, showRect.h);
				strokeWeight(1);
			}
		}

	 else if(timer <= 10){
      change = false;
		 	text("  It Escaped!", upper_text_x+100, upper_text_y);
			draw_button();
	 }
	 else{

		 text("Catch the mimic before it runs away!", upper_text_x, upper_text_y);

		 // making timer
		 fill(200,200,200);
		 rect(mim2_ready_rect.x, mim2_ready_rect.y,100, 20, 10);
		 fill(250+-2*timer, 2*timer, 0);
		 rect(mim2_ready_rect.x, mim2_ready_rect.y,timer, 20,10);

		 if (mouse_in_box(anim1_rect.x, anim1_rect.y, anim1_rect.l, anim1_rect.h)){
			 //stroke(50,50,200);
			 fill(250+-2*timer, 2*timer, 0, 50);
			 rect(anim1_rect.x, anim1_rect.y, anim1_rect.l,anim1_rect.h);
		 }
		 if (mouse_in_box(anim2_rect.x, anim2_rect.y, anim2_rect.l, anim2_rect.h)){
			 //stroke(50,50,200);
			 fill(250+-2*timer, 2*timer, 0, 90);
			 rect(anim2_rect.x, anim2_rect.y, anim2_rect.l,anim2_rect.h);
		 }
	 }


}

function draw() {
	if(health <= 0){
			background(light_red);
			if (mouse_in_box(restart_rect.x, restart_rect.y, restart_rect.l,restart_rect.h)){
				fill(orange);
			}
			else{
				fill(light_purple);
			}
				noStroke();
			  rect(restart_rect.x,restart_rect.y,restart_rect.l,restart_rect.h, restart_rect.s);
			  fill(white);
				textSize(14);
			  text("RESTART?", restart_rect.x + 10, restart_rect.y +30);
				badImgWidth = 500;
				textSize(35);
				fill(0);
				image(badEndImg, screenWidth/2-badImgWidth/2, screenHeight/2-badImgWidth/2 +80, badImgWidth,badImgWidth);
				text("Ouch! You don't feel very well.", 200, 80);
				text("Rest up and try again tomorrow.", 200, 150);
	}
	else{
	  if (scene == "Intro"){
		  draw_intro();
	    game_choice_box()
	  }
	  if (scene == "Mimic"){
	    draw_mimic_intro();
	  }
	  if (scene == "Mimic2"){
	    draw_mimic_start_scene(animal_pair[pair_count][0],animal_pair[pair_count][1]);
	  }
	  if(scene ==  "Mimic3"){
		  background(0);
		  draw_mimic_game(animal_pair[pair_count][0],animal_pair[pair_count][1]);
	  }
		if(scene == "GoodEnd") {
				background(light_green);
				goodImgWidth = 800
				textSize(30);
				image(goodEndImg, screenWidth/2 - goodImgWidth/2, screenHeight/2 -200, goodImgWidth, 400);
				text("Congratulations on making it through your hunts! \
				             Time to start the long flight!", 200, 50, 700)
				textSize(40);
				text("You are flying high and feeling " + Math.round((score *(2/3))) + "% full!", 110, 570, 750)

		}
}
if (scene != "Mimic"){
	if (mouse_in_box(restart_rect.x, restart_rect.y, restart_rect.l,restart_rect.h)){
		fill(orange);
	}
	else{
		fill(light_purple);
	}
		noStroke();
	  rect(restart_rect.x,restart_rect.y,restart_rect.l,restart_rect.h, restart_rect.s);
	  fill(white);
		textSize(14);
	  text("RESTART?", restart_rect.x + 10, restart_rect.y +30);

}
	image(bird, mouseX-50, mouseY-100, 120,120);
	fill(255);
	//text(mouseX +", " + mouseY, mouseX, mouseY);
}
function mouseClicked() {
	if(mouse_in_box(restart_rect.x,restart_rect.y,restart_rect.l,restart_rect.h)){
		scene = "Mimic";
		score = 0;
		health = 5;
		change = true;
		photo_counter =  1;
		chosen = false;
		timer = 100;
		pair_count = 0;
	}
	if (scene == "Intro" && mouse_in_box(choose_mimic_rect.x, choose_mimic_rect.y,
                                       choose_mimic_rect.l, choose_mimic_rect.h)){
  	scene = "Mimic";
  }
  if (scene == "Mimic" && mouse_in_box(eat_rect.x, eat_rect.y,
                                       eat_rect.l, eat_rect.h)){
    scene = "Mimic2";
		is_mimic_first = get_random_int(2);
  }
  if (scene == "Mimic2" && mouse_in_box(mim2_ready_rect.x,
          mim2_ready_rect.y, mim2_ready_rect.l, mim2_ready_rect.h)){
    scene = "Mimic3";
		is_mimic_first = get_random_int(2);
  }
	// mimic game set up
  if ( scene == "Mimic3"){
		//choosing a creature
 		if (mouse_in_box(anim1_rect.x, anim1_rect.y, anim1_rect.l,
		       anim1_rect.h) && change){
						 showRect = anim1_rect;
						 if(is_mimic_first){
							 score +=10;
							 chosen = true;
							 correct = true;
							 change = false;
						 }
						 else{
							 health -= 1;
							 chosen = true;
							 correct = false;
							 change = false;
						 }
					 }
	if (mouse_in_box(anim2_rect.x, anim2_rect.y, anim2_rect.l,
			 		 anim2_rect.h) && change){
						 showRect = anim2_rect;
			 			if(!is_mimic_first){
			 					score +=10;
			 					chosen = true;
								correct = true;
								change = false;
			 			}
			 			else{
			 					health -= 1;
			 					chosen = true;
								correct = false;
								change = false;
			 			}

	  }
		if((timer <5 || chosen) && mouse_in_box(mim2_ready_rect.x, mim2_ready_rect.y, mim2_ready_rect.l,
	              mim2_ready_rect.h)){
									chosen = false;
									timer = 100;
									photo_counter ++;
									is_mimic_first = get_random_int(2);
									change = true;
									if(photo_counter > 5){
										photo_counter = 1;
										scene = "Mimic2";
										pair_count ++;
										if (pair_count >= animal_pair.length ){
											scene = "GoodEnd"
										}

									}
			}

  }

}
