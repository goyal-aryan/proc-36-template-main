var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed
var fedTime;

//to pre load images
function preload() {
    sadDog = loadImage("Dog.png");
    happyDog = loadImage("happy dog.png");
}

function setup() {

    database = firebase.database();

    //to create canvas
    createCanvas(1000, 400);

    foodObj = new Food();

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    //create sprites and objects
    dog = createSprite(800, 200, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.15;

    //create feed the dog button here
    feed = createButton("Feed the dog")
    feed.position(700, 95)
    feed.mousePressed(feedDog)

    addFood = createButton("Add Food");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);

}

function draw() {

    //to give background
    background(46, 139, 87);
    foodObj.display();

    //write code to read fedtime value from the database 
    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data) {
        lastFed = data.val();
    })


    //write code to display text lastFed time here
    fill("yellow")
    if (lastFed >= 12) {
        text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
    } else if (lastFed = 0) {
        text("Last Feed : 12 AM", 350, 30)
    } else {
        text("LAST FEED :" + lastFed + 'am', 350, 30);
    }


    drawSprites();
}

//function to read food Stock
function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

//function to feed dogs
function feedDog() {
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        fedTime: hour()
    })
}

//function to add food in stock
function addFoods() {
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}