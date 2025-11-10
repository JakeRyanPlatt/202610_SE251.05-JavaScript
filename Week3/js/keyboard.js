//array of keys
var keys = [];

//keydown code
document.addEventListener(`keydown`, (e)=>{
    keys[e.key]=true;
    console.log(e.key)

    // toggle pause and options menu with Escape
    if (e.key === 'Escape') {
        const opts = document.getElementById('options');
        try {
            // if game is running, pause and show options
            if (typeof currentState !== 'undefined' && currentState === 'game') {
                currentState = 'pause';
                if (opts) opts.classList.remove('hidden');
            } else {
                // otherwise un-pause and hide options
                currentState = 'game';
                if (opts) opts.classList.add('hidden');
            }
        } catch (err) {
            // currentState may not be defined yet; just show options
            if (opts) opts.classList.remove('hidden');
        }
    }
})


//keyup code
document.addEventListener(`keyup`, (e)=>{
    keys[e.key]=false;
})
