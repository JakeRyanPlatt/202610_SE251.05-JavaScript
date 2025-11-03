//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97

const player = [0,1];

//p0 setup
var player[0] = new Box();
player[0].w = 20
player[0].h = 150
player[0].x = 0 + player1.w/2

//p1 setup
var player[1] = new Box();
player[1].w = 20
player[1].h = 150
player[1].x = c.width - player2.w/2


//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    //player  accelerates when key is pressed 
    if(keys[`w`])
    {
       player[0].vy += -player[0].force
    }

    if(keys[`s`])
    {
        player[0].vy += player[0].force
    }
  if(keys[`keyup`])
    {
       player[1].vy += -player[1].force
    }

    if(keys[`keydown`])
    {
        player[1].vy += player[1].force
    }


    //applies friction
    player[0].vy *= fy
    //player movement
    player[0].move();

    //ball movement
    ball.move()

    //player collision
    if(player[0].y < 0+player[0].h/2)
    {
        player[0].y = 0+player[0].h/2
    }
    if(player[0].y > c.height-player[0].h/2)
    {
        player[0].y = c.height-player[0].h/2
    }

    //ball collision 
    if(ball.x < 0)
    {
        ball.x = c.width/2
        ball.y  =c.height/2
    }
    if(ball.x > c.width)
    {
        ball.x = c.width
        ball.vx = -ball.vx
    }
    if(ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if(ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy
       
    }

    //p1 with ball collision
    if(ball.collide(player[i]))
    {
        ball.x = player[i].x + player[i].w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //draw the objects
    player[i].draw()
    ball.draw()
}
