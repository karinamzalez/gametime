const Tray        = require('../lib/tray');
const Gallery = require('./gallery');
const Overlord = require('./overlord');
const TrayCollision = require('./tray-collision');
const ScoreBoard = require('./score-board');
const JunkFood = require('./junk-food');
const RandomJunkFood = require('./random-junk-food');
const UserInput = require('./user-input');

function World(width, height, ctx){
  this.width    = width;
  this.height   = height;
  this.ctx      = ctx;
  this.tray     = new Tray({ctx: ctx});
  this.junkFoods = [];
}

var gallery;
var overlord;
var overlordImage;
var trayCollision;
var startButton = document.getElementById('start');
var scoreBoard = '';
var gameRunning = false;
var healthFoods = [];
var overlordImage;
var userInput;

World.prototype.makeNewGame = function(){
  gallery = new Gallery();
  overlordImage = new Image();
  overlord = new Overlord();
  trayCollision = new TrayCollision(this.tray);
  userInput = new UserInput(this);
  overlord.draw(overlordImage, this.ctx);
  gallery.start();
  gameRunning = true;
  startButton.style.display = 'none';
  this.startScores();
};

World.prototype.startScores = function(){
  var list = document.getElementById('high-scores');
  scoreBoard = new ScoreBoard(list);
  scoreBoard.loadStoredScores();
};

World.prototype.setGameStyling= function(){
  document.getElementById('instructions').style = "display: none";
  document.getElementById('score-title').style = "display: block";
  document.getElementById('high-scores').style = "display: block";
  document.getElementById('level').innerHTML = "<h2>Level 1</h2>";
};

World.prototype.userInput = function(){
  document.addEventListener('keydown', function(event){
    if (event.keyCode === 39) { userInput.rightArrow();}

    if (event.keyCode === 37) { userInput.leftArrow();}
  });
};

World.prototype.audioOn = function(){
  var gameAudio = document.createElement("audio");
  gameAudio.src = "Get_Outside.mp3";
  gameAudio.play();
  gameAudio.pause();
};

World.prototype.drawCanvas= function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.fillStyle = '#3D9970';
  this.ctx.fillRect(0, 0, this.width, this.height);
};

World.prototype.draw = function(){
  this.drawCanvas(this);
  this.tray.draw(this);
  overlord.draw(overlordImage, this.ctx);
};

World.prototype.addScore = function(winningScore){
  if(scoreBoard.scores[0] && trayCollision.total > Math.min.apply(Math, scoreBoard.scores)){
    scoreBoard.addHighScoreToPage(winningScore);
  } else {
    scoreBoard.addHighScoreToPage(winningScore);
  }
};

World.prototype.endGame = function(){
  if(trayCollision.total >= 600){
    this.addScore(trayCollision.total);
    alert("You won! Your score was " + trayCollision.total + " points.");
    this.endGameStyling();
  } else if (trayCollision.total < 0){
    alert("You lost! Eat more vegetables next time to defeat the Empty Calorie Overlord.");
    this.endGameStyling();
  }
  this.stopGameMovement();
  this.resetGame();
  document.getElementById('score-game').innerHTML = "Score: " + trayCollision.total;
  return gameRunning = false;
};

World.prototype.resetGame = function(){
  healthFoods = [];
  this.junkFoods = [];
  trayCollision.total = 0;
};

World.prototype.endGameStyling = function(){
  document.getElementById('instructions').style = "display: block";
  document.getElementById('start-btn').style = "display: block";
  document.getElementById('score-title').style = "display: none";
  document.getElementById('high-scores').style = "display: none";
  document.getElementById('game').style = "display: none";
  startButton.style.display = 'block';
};

World.prototype.stopGameMovement = function(){
  for (var i = 0; i < 1000; i++) {
    window.clearInterval(i);
  }
};

World.prototype.increaseDifficulty = function(){
  var interval = 500;
  function oscillate(){
    interval = interval - 2;
    if(overlord.x < 0 || overlord.x > this.width - overlord.width){
      overlord.speed = -overlord.speed;
    }
    overlord.x += overlord.speed;

    if(overlord.x%(Math.floor(Math.random() * 100)) === 0){
      this.createJunkFood();
    }
    if (interval >= 50){
      setTimeout(oscillate.bind(this), interval);
    } else if (interval < 75){
      setTimeout(oscillate.bind(this), 75);
    }
  }
  oscillate.call(this);
};

World.prototype.checkGameEnders = function(){
  trayCollision.checkLevel();
  if(trayCollision.total < 0 && gameRunning || trayCollision.total >= 600 && gameRunning || !gameRunning){
    this.endGame();
  }
};

World.prototype.callJunkCollision = function(reqAnimFrameID){
  trayCollision.check(this.junkFoods, trayCollision, reqAnimFrameID);
};

World.prototype.callHealthCollision = function(healthFoods, reqAnimFrameID){
  trayCollision.check(healthFoods, trayCollision, reqAnimFrameID);
};

World.prototype.createJunkFood = function(){
  var overlordMouth = Math.floor(overlord.x + (overlord.width/2));
  var randomJunkFoodAttributes = new RandomJunkFood(overlordMouth);
  var junkFood = new JunkFood(randomJunkFoodAttributes);
  junkFood.ctx = this.ctx;
  this.junkFoods.push(junkFood);
};

module.exports = World;
