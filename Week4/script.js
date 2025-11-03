let button = document.querySelector(`button`)
let options = document.querySelector(`.options`)
let body = document.querySelector(`body`)
let colors = document.querySelectorAll(`input[type=color]`)



button.addEventListener(`click`, e=>{
    options.classList.toggle(`hide`)
    button.innterText = (options.classList[1]==="hide")?button.innerText =`open`:button.innterText=`close`
})

colors[0].addEventListener(`input`, e=>{
    body.style.backgroundColor = e.target.value
    e.target.nextElementSibling.value = e.target.value;
})


colors[0].nextElementSibling.addEventListener(`change`, e=>{
        colors[0].value = e.target.value
        body.style.backgroundColor = e.target.value
})

class box{
    constructor()
    {
    this.stroke = `#ffffff`
    }
}

let cube = new box();

let span = document.querySelector(`span`)
span.innerText = cube[`stroke`];

document.querySelector(`input[type=range]`).addEventListener(`input`, e=>{
    body.style.backgroundColor = `rgb(${e.target.value},0,0)`
})

document.querySelector(`input[type="range"]`),addEventListener(`input`, e=>{
    body.style.backgroundColor = `rgb(${e.target.value},0,0)`
})




/*const c = document.querySelector(`canvas`);
const ctx = c.getContext(`2d`);

var state = []
state[0] = function(){
 ctx.fillRect(0,0,c.width,c.height)
    ctx.fillRect(100,100,100,100);
}

state[1] = function(){
    ctx.beginPath();
    ctx.arc(c.width/2,c.height/2, 50,0,Math.pi*2, true)
    ctx.closePath();
ctx.fill();
}

var currentState = `pause`;

timer = setInterval(e=>{
 state[currentState]();
},1000/60);

*/  
