var updateCount;

var canvasWidth = 500;
var canvasHeight = 500;

var enemy = [];
var projectile = [];

var miniNum = 20;
var miniLayer = 5;
var miniWidth = 10;

var player;
var playerSkin;
var gameover = false;
var win = false;

var waveFlag = false;

function setup()
{
    createCanvas(canvasWidth, canvasWidth);
    player = new Player(width/2, (height - height/10), 20, 20);

    setEntity();
    playerSkin = loadImage('assets/dort.jpg');
}
function draw()
{
    clear();
    background(0);

    if(!gameover)
    {
        updateCount++;
    
        enemyAI();
        drawEntity();
    
        playerControl();
        drawPlayer();
    
        projectileAI();
        drawProjectile();
    
        gameCheck();
    }
    else
    {
        fill("white");
        textSize(50);
        if(!win)
        {
            text("Game Over", 0, height/2);    
        }
        else
        {
            text("You Won!", 0, height/2);
        }
    }
}
function playerControl()
{
    var normSpeed = 10;
    var shiftSpeed = 3;
    var useSpeed;
    if(keyIsDown(SHIFT))
    {
        useSpeed = shiftSpeed;
    }
    else
    {
        useSpeed = normSpeed;
    }

    if (keyIsDown(RIGHT_ARROW) && player.posX < canvasWidth - player.w)
    {
        player.posX += useSpeed;
    }
    if (keyIsDown(LEFT_ARROW) && player.posX > 0)
    {
        player.posX += useSpeed * -1;
    }
}
function keyPressed()
{
    if(keyIsDown(32)) //press space
    {
        projectile.push(new Projectile(player.posX + (player.w/2), player.posY - player.h, 0, -5, 3, 30, "playerProjectile", true));
    }
}
function mouseClicked()
{

}
function drawPlayer()
{
    fill("white");
    rect(player.posX, player.posY, player.w, player.h);
}

function enemyAI()
{
    for(let i = 0; i < enemy.length; i++)
    {
        if(enemy[i].type == "mini")
        {
            if(checkSide(enemy[i].posX, enemy[i].posY, enemy[i].w, enemy[i].h))
            {
                for(let j = 0; j < enemy.length; j++)
                {
                    enemy[i].velX *= -1;
                    enemy[i].posY += 50
                }
            }
        }

        enemy[i].posX += enemy[i].velX;
        enemy[i].posY += enemy[i].velY;

        if(enemy[i].hp <= 0)
        {
            enemy.splice(i, 1); //get delet
        }
    }
}
function drawEntity()
{
    for(let i = 0; i < enemy.length; i++)
    {
        fill("red");
        rect(enemy[i].posX, enemy[i].posY, enemy[i].h, enemy[i].w)
    }
}
function setEntity()
{
    if(!waveFlag)
    {
        for(let i = 0; i < miniNum; i++)
        {
            const x = (miniWidth*2) * i;
            for(let j = 0; j < miniLayer; j++)
            {
                const y = (miniWidth*2) * j;

                enemy.push(new Entity(x, y, 2, 0, miniWidth, miniWidth, "mini", 1));  //spawing the minis
            }
        }
    }
}
function projectileAI()
{
    for(let i = 0; i < projectile.length; i++)
    {
        projectile[i].timeSpent++;

        if(projectile[i].type = "playerProjectile")
        {
            for(let j = 0; j < enemy.length; j++)
            {
                if(checkHitbox(projectile[i].posX, projectile[i].posY, projectile[i].w, projectile[i].h, enemy[j].posX, enemy[j].posY, enemy[j].w, enemy[j].h))
                {
                    projectile[i].alive = false;
                    enemy[j].hp--;
                }
            }
        }
        projectile[i].posX += projectile[i].velX;
        projectile[i].posY += projectile[i].velY;

        if(projectile[i].posX > canvasHeight || projectile[i].posX < 0 || projectile[i].timeSpent >= projectile[i].lifetime)
        {
            projectile[i].alive = false;
        }
        if(!projectile[i].alive)
        {
            projectile.splice(i, 1);
        }
    }
}
function drawProjectile()
{
    for(let i = 0; i < projectile.length; i++)
    {
        if(projectile[i].friendlyBool)
        {
            fill(26, 255, 0);
        }
        else
        {
            fill(255, 112, 0);
        }
        rect(projectile[i].posX, projectile[i].posY, projectile[i].w, projectile[i].h)
    }
}
function gameCheck()
{
    for(let i = 0; i < enemy.length; i++)
    {
        if(enemy[i].posY >= player.posY || checkHitbox(enemy[i].posX, enemy[i].posY, enemy[i].w, enemy[i].h, player.posX, player.posY, player.w, player.h))
        {
            gameover = true;
        }
    }
    if(enemy.length == 0)
    {
        win = true;
    }
    if(win)
    {
        gameover = true;
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function checkHitbox(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H) //
{
    var istrue = (rect1X < rect2X + rect2W) && (rect1X + rect1W > rect2X) && (rect1Y < rect2Y + rect2H) && (rect1Y + rect1H > rect2Y); //thanks internet
    return istrue;
}
function checkSide(positionX, positionY, w, h)
{
    var istouching = (positionX > canvasWidth - w) || (positionX < 0) || (positionY > canvasHeight - h) || (positionY < 0);
    return istouching;
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~calvins thing~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// var canvasWidth = 600;
// var canvasHeight = 600;
// var px=canvasWidth/2;
// var py=550;
// var pWidth=15;
// var pHeight=15;

// function setup(){
//    createCanvas(canvasWidth,canvasHeight);
//    background(0,0,0);
   
// }

// function draw(){
//    fill(191, 18, 6),
//    rect (px,py,5,10);
//    fill ('white')
//    rect (px,py,pWidth,pHeight);

//    if (keyIsDown(RIGHT_ARROW)){
//        px= px+5;
//        fill ('black');
//        rect(0,py,canvasWidth,pHeight);
//    }
//    else if (keyIsDown(LEFT_ARROW)){
//        px= px-5;
//        fill ('black');
//        rect(0,py,canvasWidth,pHeight);
//    }
//    fill ('white')
//    rect (px,py,pWidth,pHeight);
// }
// function keyPressed(){
//     if (keyCode == SPACE)
//     lazerHight = py + 10
// }