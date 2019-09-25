var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started= false;
var level=0;

function startOver()
{
  level = 0 ;
  gamePattern= [];
  started= false;
}

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started= true;
  }
});

$(".btn").click(function(){
  var userChoseColor = $(this).attr("id");
  userClickedPattern.push(userChoseColor);

  playSound(userChoseColor);
  animatepRress(userChoseColor);

checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]=== userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length=== gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else
  {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function animatepRress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence(){
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.random();
  randomNumber= randomNumber * 4;
  randomNumber= Math.floor(randomNumber);
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // animation

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



function playSound(name)
{
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}
