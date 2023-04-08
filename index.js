var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level = 0;
$(document).keypress( function()
{
    if (!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkans(userClickedPattern.length-1);
}
)
function checkans(currentLevel)
{
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
            nextSequence(); 
        },1000);
    }
    }
    else{
        console.log("wrong");
        playsound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startover();
    }
}
function nextSequence() {
    userClickedPattern=[];
    level += 1;
    $("h1").text("level " + level);
    var a = Math.random();
    a = a * 3;
    a = Math.floor(a);
    a = a + 1;
    var randomChosenColour = buttonColours[a];
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    playsound(randomChosenColour);
}


function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}
function startover()
{
  level=0;
  started=false;
  gamePattern=[];
}