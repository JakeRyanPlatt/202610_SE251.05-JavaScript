//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97


//player1 setup
var p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = p1.w/2

//player2 setup
var p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2
p2.color = `teal`

// create Player instances and give them a paddle (pad)
const player = [];
player[0] = new Player("Player 1", 0, 0, p1);
player[1] = new Player("Player 2", 0, 0, p2);



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
    
    //p[0] accelerates when key is pressed 
    if(keys[`w`])
    {
       player[0].pad.vy += -player[0].pad.force
    }

    if(keys[`s`])
    {
        player[0].pad.vy += player[0].pad.force
    }
   
    for(let i = 0; i < player.length; i++)
    {
        player[i].pad.vy *= fy //friction

        player[i].pad.move(); //move


        player[i].pad.draw() //draw players

    if(player[i].pad.y < 0+player[i].pad.h/2)
    {
        player[i].pad.y = 0+player[i].pad.h/2
    }
    if(player[i].pad.y > c.height-player[i].pad.h/2)
    {
        player[i].pad.y = c.height-player[i].pad.h/2
    }
    }
 
    //ball collision 
    if(ball.x < 0)
    {
        // left wall: reset ball to center and restore starting velocity
        ball.x = c.width/2
        ball.y = c.height/2
        ball.vx = -2
        ball.vy = -2
    }
    if(ball.x > c.width)
    {
        // right wall: reset ball to center and restore starting velocity
        ball.x = c.width/2
        ball.y = c.height/2
        ball.vx = -2
        ball.vy = -2
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

    // player[0] with ball collision
    if(ball.collide(player[0].pad))
    {
        ball.x = player[0].pad.x + player[0].pad.w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //p2 accelerates when key is pressed]
    if(keys[`ArrowUp`])
    {
       player[1].pad.vy += -player[1].pad.force
    }
    if(keys[`ArrowDown`])
    {
        player[1].pad.vy += player[1].pad.force
    }


   // ball movement
    ball.move()

    
    // player[1] with ball collision
    if(ball.collide(player[1].pad))
    {
        // place the ball to the left of p2 and reverse X velocity
        ball.x = player[1].pad.x - player[1].pad.w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    //draw the objects
    ball.draw()
}
