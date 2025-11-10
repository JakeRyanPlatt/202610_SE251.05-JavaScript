function hideAllSections() {
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });   
}

const mySectionElement = document.getElementById('options');
hideAllSections(); //Hide option section first

const targetSelect = mySectionElement.querySelector('h2'); //select h2 outside event listener

const sidesDivs = mySectionElement.querySelectorAll('.sides'); //select all divs w/ class sides 
sidesDivs.forEach(div => {
            div.classList.add('hidden'); //initially hide side divs 

targetSelect.addEventListener('click', (e) => {
        
        }); 
        sidesDivs.forEach(div => {
                div.classList.toggle('hidden') // toggle hide       
        });
}); 