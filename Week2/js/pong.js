//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97

// NodeList that contains the two divs in the #score section
var scoreEls = document.querySelectorAll('#score div');

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

function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    // paddle input, friction and movement (looped for both pads)
    for (var i = 0; i < pad.length; i++)
    {
        // controls: left player uses W/S, right player uses Arrow keys
        if (i === 0)
        {
            if (keys['w']) { pad[i].vy += -pad[i].force; }
            if (keys['s']) { pad[i].vy += pad[i].force; }
        }
        else if (i === 1)
        {
            if (keys['ArrowUp']) { pad[i].vy += -pad[i].force; }
            if (keys['ArrowDown']) { pad[i].vy += pad[i].force; }
        }

        // apply friction and move
        pad[i].vy *= fy;
        pad[i].move();
    }
//ball movement
    ball.move()

// paddle collision with canvas bounds
    for (var i = 0; i < pad.length; i++)
    {
        if (pad[i].y < 0 + pad[i].h/2)
        {
            pad[i].y = 0 + pad[i].h/2;
        }
        if (pad[i].y > c.height - pad[i].h/2)
        {
            pad[i].y = c.height - pad[i].h/2;
        }
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

// paddle collisions
    for (var i = 0; i < pad.length; i++)
    {
        if (ball.collide(pad[i]))
        {
            // left paddle (i===0) should push ball to the right, right paddle to the left
            var dir = (i === 0) ? 1 : -1;
            ball.x = pad[i].x + dir * (pad[i].w/2 + ball.w/2);
            ball.vx = -ball.vx;
        }
    }

    //draw the objects
    for (var i = 0; i < pad.length; i++)
    {
        pad[i].draw();
    }
    ball.draw()
    // update onscreen score divs
    for (var i = 0; i < scoreEls.length; i++)
    {
        scoreEls[i].innerText = player[i].score;
    }
}
