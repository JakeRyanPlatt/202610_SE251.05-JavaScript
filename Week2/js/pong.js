//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97

//p1 setup
var p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2
p1.color = `red`

//p2 setup (right-side player)
var p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2
p2.color = `teal`
// global player array
var player = [];

// create two players and assign their pad to the existing paddle Boxes
player[0] = new Player();
player[1] = new Player();
player[0].pad = p1;
player[1].pad = p2;

// pad array holds the players' paddle avatars for 
var pad = [];
pad[0] = player[0].pad;
pad[1] = player[1].pad;


//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

//score setup


function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    //player 1 accelerates when key is pressed
    if(keys[`w`])
    {
       pad[0].vy += -pad[0].force
    }

    if(keys[`s`])
    {
        pad[0].vy += pad[0].force
    }
    //player 2 accelerates when up/down arrows are pressed
    if(keys[`ArrowUp`])
    {
        pad[1].vy += -pad[1].force
    }

    if(keys[`ArrowDown`])
    {
        pad[1].vy += pad[1].force
    }
    //applies friction
    pad[0].vy *= fy
    pad[1].vy *= fy
    //player movement
    pad[0].move();
    pad[1].move();

    //ball movement
    ball.move()

    //pad[0] (left paddle) collision with canvas bounds
    if(pad[0].y < 0+pad[0].h/2)
    {
        pad[0].y = 0+pad[0].h/2
    }
    if(pad[0].y > c.height-pad[0].h/2)
    {
        pad[0].y = c.height-pad[0].h/2
    }

    //pad[1] (left paddle) collision with canvas bounds
    if(pad[1].y < 0+pad[1].h/2)
    {
        pad[1].y = 0+pad[1].h/2
    }
    if(pad[1].y > c.height-pad[1].h/2)
    {
        pad[1].y = c.height-pad[1].h/2
    }
    //ball collision 
    if(ball.x < 0)
    {
        // ball left the screen: point for right-side player (score for right player)
    player[1].score++;
    console.log(`${player[0].score} | ${player[1].score}`);
        ball.x = c.width/2
        ball.y  = c.height/2
    }
    if(ball.x > c.width)
    {
        //reset ball to center when it goes off the right side (score for left player)
    player[0].score++;
    console.log(`${player[0].score} | ${player[1].score}`);
        ball.x = c.width/2
        ball.y  = c.height/2
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

    //left paddle collision
    if(ball.collide(pad[0]))
    {
        ball.x = pad[0].x + pad[0].w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //right paddle collision (bounce off right paddle)
    if(ball.collide(pad[1]))
    {
        ball.x = pad[1].x - pad[1].w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    //draw the objects
    pad[0].draw()
    pad[1].draw()
    ball.draw()
}
