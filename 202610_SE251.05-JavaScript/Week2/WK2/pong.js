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
p1.x = 0 + p[0].w/2

//p2 setup
var p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2
p2.color = `teal`

p = [p[0], p2]



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
       p[0].vy += -p[0].force
    }

    if(keys[`s`])
    {
        p[0].vy += p[0].force
    }
    //applies friction
    
    //player movement
 

    for(let i = 0; i < p.length; i++)
    {
        p[i].vy *= fy //friction

        p[i].move(); //move


        p[i].draw() //draw players

    if(p[i].y < 0+p[i].h/2)
    {
        p[i].y = 0+p[i].h/2
    }
    if(p[i].y > c.height-p[i].h/2)
    {
        p[i].y = c.height-p[i].h/2
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

    //p[0] with ball collision
    if(ball.collide(p[0]))
    {
        ball.x = p[0].x + p[0].w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //p2 accelerates when key is pressed]
    if(keys[`ArrowUp`])
    {
       p2.vy += -p2.force
    }
    if(keys[`ArrowDown`])
    {
        p2.vy += p2.force
    }


   // ball movement
    ball.move()

    
    //p2 with ball collision
    if(ball.collide(p2))
    {
        // place the ball to the left of p2 and reverse X velocity
        ball.x = p2.x - p2.w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    //draw the objects
    ball.draw()
}
