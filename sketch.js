//Create variables here
var dog, happyDog, database, foodS, foodStock;
var fedTime,lastFed, feed, add, foodObj;
function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  database = firebase.database();
  dog.addImage(dogimg);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Food();

  feed = createButton("Feed");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
})
fill(255, 255,254);
textSize(15);

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
  //add styles here

}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
  }

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

fuction feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(goodObj.getFoodStock()-1);
  database.red('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}