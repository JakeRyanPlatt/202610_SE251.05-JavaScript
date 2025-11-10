// Wait for DOM (and other scripts) to load so elements like #optionsBtn and #padColorPicker exist
window.addEventListener('load', () => {
    const optionsBtn = document.getElementById('optionsBtn');
    const mySectionElement = document.getElementById('options');
    const targetSelect = mySectionElement && mySectionElement.querySelector('h2'); //select h2 outside event listener
    const sidesDivs = mySectionElement ? mySectionElement.querySelectorAll('.sides') : [];
    const colorPicker = document.getElementById('padColorPicker');
    const targetInput = document.getElementById('targetInput');

    if (optionsBtn && mySectionElement) {
        optionsBtn.addEventListener('click', () => { //button toggle for all options
            mySectionElement.classList.toggle('hidden');
        });
    }

    if (sidesDivs.length) {
        sidesDivs.forEach(div => div.classList.add('hidden')); //initially hide side divs 
    }

    if (targetSelect) {
        targetSelect.addEventListener('click', () => {
            sidesDivs.forEach(div => {
                div.classList.toggle('hidden');
            });
        });
    }

    // Wire all color inputs with class 'fill' inside the options to the player models
    const fillInputs = mySectionElement ? mySectionElement.querySelectorAll('input.fill[type="color"], input[type="color"].fill, input.fill') : [];

    fillInputs.forEach((input, i) => {
        // initialize input value from player data
        if (window.player && player[i] && player[i].fill) {
            try { input.value = player[i].fill; } catch (e) { }
        }

        // find an output element to show the hex value
        let output = null;
        if (input.nextElementSibling && input.nextElementSibling.classList && input.nextElementSibling.classList.contains('output')) {
            output = input.nextElementSibling;
        } else {
            const side = input.closest('.sides');
            if (side) output = side.querySelector('.output');
        }

        if (output && window.player && player[i]) {
            output.innerHTML = player[i].fill;
        }

        input.addEventListener('input', (e) => {
            const val = e.target.value;
            // update model
            if (window.player && player[i]) {
                player[i].fill = val;
                if (player[i].pad) player[i].pad.fill = val;
            }

            // update output display
            if (output) output.innerHTML = val;
        });
    });
});
