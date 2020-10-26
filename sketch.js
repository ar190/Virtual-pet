var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var FoodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = Newfood();


  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  feed=createButton("Feed the Dog");
  feed.postion(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.postion(800,95);
  addFood.mousePressed(addFoods);
}

// function to display UI
function draw() {
  background(46,139,87);
 foodObj.Display();

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Feed :" +lastFed%12 + PM ,350,30);
 } else if (lastFed==0){
  text("Last Feed : 12 AM",350,30);
 }else{
  text("Last Feed :"+lastFed + AM ,350,30);

 }
}
drawSprites();
 
  //Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodSock()-1);
  database.ref('/').update({
    food:foodObj.getFoodSock(),
    FeedTime:hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
