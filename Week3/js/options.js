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

    // queryselect fill inputs into section element fillInputs
    const fillInputs = mySectionElement ? mySectionElement.querySelectorAll('input.fill[type="color"]') : [];

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

    // keyboard 'up' inputs (class 'u') - allow changing each player's up key
    const uInputs = mySectionElement ? mySectionElement.querySelectorAll('input.u[type="text"]') : [];

    uInputs.forEach((input, i) => {
        // initialize input value from player data if available
        try {
            if (window.player && player[i] && player[i].keys && player[i].keys.u) {
                input.value = player[i].keys.u;
            }
        } catch (e) { }

        // find output element to display the key name
        let output = null;
        if (input.nextElementSibling && input.nextElementSibling.classList && input.nextElementSibling.classList.contains('output')) {
            output = input.nextElementSibling;
        } else {
            const parent = input.closest('.controls');
            if (parent) {
                const controlGroup = input.closest('.control-group');
                if (controlGroup) {
                    output = controlGroup.querySelector('.output');
                }
            }
        }

        if (output && window.player && player[i] && player[i].keys) {
            output.innerHTML = player[i].keys.u;
        }

        // when a key is pressed while the input is focused, capture the key name
        input.addEventListener('keydown', (e) => {
            e.preventDefault(); // prevent the default character input
            const keyName = e.key;

            console.log(`Player ${i + 1} UP key changed to: ${keyName}`);

            // update the visible input
            input.value = keyName;

            // update the player model
            if (window.player && player[i]) {
                if (!player[i].keys) player[i].keys = {};
                player[i].keys.u = keyName;
            }

            // update the output display
            if (output) output.innerHTML = keyName;
        });

        // when focusing the input, pause the game so key presses change controls
        input.addEventListener('focus', (e) => {
            try { currentState = 'pause'; } catch (err) { /* ignore if currentState not defined yet */ }
        });
    });

    // keyboard 'down' inputs (class 'd') - allow changing each player's down key
    const dInputs = mySectionElement ? mySectionElement.querySelectorAll('input.d[type="text"]') : [];

    dInputs.forEach((input, i) => {
        // initialize input value from player data if available
        try {
            if (window.player && player[i] && player[i].keys && player[i].keys.d) {
                input.value = player[i].keys.d;
            }
        } catch (e) { }

        // find output element to display the key name
        let output = null;
        if (input.nextElementSibling && input.nextElementSibling.classList && input.nextElementSibling.classList.contains('output')) {
            output = input.nextElementSibling;
        } else {
            const parent = input.closest('.controls');
            if (parent) {
                const controlGroup = input.closest('.control-group');
                if (controlGroup) {
                    output = controlGroup.querySelector('.output');
                }
            }
        }

        if (output && window.player && player[i] && player[i].keys) {
            output.innerHTML = player[i].keys.d;
        }

        // when a key is pressed while the input is focused, capture the key name
        input.addEventListener('keydown', (e) => {
            e.preventDefault(); // prevent the default character input
            const keyName = e.key;

            console.log(`Player ${i + 1} DOWN key changed to: ${keyName}`);

            // update the visible input
            input.value = keyName;

            // update the player model
            if (window.player && player[i]) {
                if (!player[i].keys) player[i].keys = {};
                player[i].keys.d = keyName;
            }

            // update the output display
            if (output) output.innerHTML = keyName;
        });

        // when focusing the input, pause the game so key presses change controls
        input.addEventListener('focus', (e) => {
            try { currentState = 'pause'; } catch (err) { /* ignore if currentState not defined yet */ }
        });
    });
});