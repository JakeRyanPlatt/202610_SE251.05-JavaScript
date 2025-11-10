/*toggle: when the Options H2 is clicked, toggle `.hidden` on all `.sides` */

document.addEventListener(`Escape`, function () {
    // Select the Options heading directly
    var heading = document.querySelector(`#options h2`);

    if (!heading) return; // nothing to attach to

    heading.addEventListener('click', function () {
        var list = document.querySelectorAll('.sides');
        if (!list || list.length === 0) return;
        list.forEach(function (s) { s.classList.toggle('hidden'); });
    });
});
