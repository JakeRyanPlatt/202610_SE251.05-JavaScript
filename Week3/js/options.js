const optionsBtn = document.getElementById('optionsBtn');
const mySectionElement = document.getElementById('options');
const targetSelect = mySectionElement.querySelector('h2'); //select h2 outside event listener
const sidesDivs = mySectionElement.querySelectorAll('.sides'); //select all divs w/ class sides 

optionsBtn.addEventListener('click', () => { //button toggle for all options
    mySectionElement.classList.toggle('hidden');
});

sidesDivs.forEach(div => {
    div.classList.add('hidden'); //initially hide side divs 
});

targetSelect.addEventListener('click', () => {
    sidesDivs.forEach(div => {
        div.classList.toggle('hidden');
    });
});