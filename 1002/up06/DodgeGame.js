window.addEventListener("load",drawScreen,false);
window.addEventListener("keydown",onkeydown,true);

var GAME_STATE_READY = 0;
var GAME_STATE_GAME = 1;
var GAME_STATE_OVER = 2;

var GameState = GAME_STATE_READY;

var imgBackground = new Image();
imgBackground.src = "img/background.png";
imgBackground.addEventListener("load",drawScreen,false);

var imgPlayer = new Image();
imgPlayer.src = "img/player.png";
imgPlayer.addEventListener("load", drawScreen,false);

var intPlayerX = 350;
var intPlayerY = 250;
var arrMissiles = new Array();

var tempMissile1 = {x:0, y:0, go_x:1, go_y:1};
var tempMissile2 = {x:800, y:0, go_x:-1, go_y:1};
var tempMissile3 = {x:800, y:600, go_x:-1 , go_y:-1};
var tempMissile4 = {x:0, y:600, go_x:1, go_y:-1};

var imgMissile = new Image();
imgMissile.src = "img/missile.png"

var intervalID;

function onGameStart(){
  GameState = GAME_STATE_GAME;
  intervalID = setInterval(MoveMissile, 100);
  arrMissiles.push({x:0, y:0, go_x:1, go_y :1});
  arrMissiles.push({x:800, y:0, go_x:-1, go_y :1});
  arrMissiles.push({x:800, y:600, go_x:-1, go_y :-1});
  arrMissiles.push({x:0, y:600, go_x:1, go_y :-1});

}

function onGameOver(){
  GameState = GAME_STATE_OVER;
  clearInterval(intervalID);
}

function onReady() {
    GameState = GAME_STATE_READY;
    intPlayerX = 350;
    intPlayerY = 250;
    while (arrMissiles.length != 0) {
      arrMissiles.pop();

    }
}


function MoveMissile()
{
  for(var i = 0 ; i < arrMissiles.length; i++){
    arrMissiles[i].x += arrMissiles[i].go_x *3;
    arrMissiles[i].y += arrMissiles[i].go_y *3;
    if(IsCollisionWithPlayer(arrMissiles[i].x, arrMissiles[i].y)){
      onGameOver();
    }
  }
  drawScreen();
}

function drawScreen()
{
  var theCanvas = document.getElementById("GameCanvas");
  var Context = theCanvas.getContext("2d");

  Context.fillStyle = "#000000";
  Context.fillRect(0,0,800,600);

  Context.drawImage(imgBackground,0,0);

  Context.drawImage(imgPlayer, intPlayerX,intPlayerY);
  Context.fillStyle = "#ffffff";
  Context.font = '50px Arial';
  Context.textBaseline = "top";
  //게임 준비 중
  if(GameState == GAME_STATE_READY)
  {
    Context.fillText("준비",330,180);
    intPlayerX = 350;
    intPlayerY = 250;
    for(var i = 0; i < arrMissiles.length; i++){
      Context.drawImage(imgMissile, arrMissiles[i].x, arrMissiles[i].y);
    }
  }
  // 게임 중
  else if(GameState == GAME_STATE_GAME)
  {
    for(var i = 0; i < arrMissiles.length; i++){
      Context.drawImage(imgMissile, arrMissiles[i].x, arrMissiles[i].y);
    }
  }

  else if( GameState == GAME_STATE_OVER)
  {
    for(var i = 0; i < arrMissiles.length; i++){
      Context.drawImage(imgMissile, arrMissiles[i].x, arrMissiles[i].y);
    }
  Context.fillText("게임 오버",330,180);
  }
}



function onkeydown(e)
{
  //게임 준비중
  if(GameState == GAME_STATE_READY)
  {
    //게임을 시작합니다.
    if(e.keyCode == 13){
      //엔터를 입력하면 게임시작
    GameState = GAME_STATE_GAME;
    onGameStart();
  }
}

//게임 중
 else if(GameState == GAME_STATE_GAME)
{
  //기존의 플레이어 이동 처리 코드
  switch (e.keyCode) {
    case 37:
    intPlayerX-=5;
    if(intPlayerX < 0)
    {
      //intPlayerX = 0;
      GameState = GAME_STATE_OVER;
    }
      break;
      case 39:
      intPlayerX+=5;
      if(intPlayerX > 740)
      {
      //  intPlayerX = 740;
      GameState = GAME_STATE_OVER;
      }
      break;
      case 38:
      intPlayerY-=5;
      if(intPlayerY < 0)
      {
        //intPlayerY = 0;
        GameState = GAME_STATE_OVER;
      }
        break;
        case 40:
        intPlayerY+=5;
        if(intPlayerY > 540)
        {
        //  intPlayerY = 540;
        GameState = GAME_STATE_OVER;
        }
          break;
  };
}
//게임 오버
else if (GameState == GAME_STATE_OVER) {
  //게임 준비 상태로 변경
  if (e.keyCode==13) {
    //엔터키를 입력하면 준비 상태로
    onReady();

  }

}
drawScreen();
}

function IsCollisionWithPlayer(x, y)
{
  if((intPlayerX+55) > (x+5) && (intPlayerX + 5) < (x +25) && (intPlayerY +5) < (y+25) && (intPlayerY + 55) > (y+5)){
    return true;
  }
  return false;
}
