/* Simple: toggle `hidden` on all `.sides` elements when the options H2 is clicked */

document.addEventListener('DOMContentLoaded', function () {
    var heading = document.querySelector('#options h2') ||
                  document.querySelector('.options h2') ||
                  document.querySelector('section#options h2') ||
                  document.querySelector('h2.options');

    if (!heading) return; // nothing to attach to

    heading.addEventListener('click', function () {
        var list = document.querySelectorAll('.sides');
        if (!list || list.length === 0) return;
        list.forEach(function (s) { s.classList.toggle('hidden'); });
    });
});
