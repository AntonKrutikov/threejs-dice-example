//Inspired by http://a.teall.info/dice/. Thanks.
"use strict";

function preload_and_init(container) {
    let loadLogoTexture = () => {
        return new Promise(function (resolve){
            let img = new Image()
            img.onload = () => {
                resolve(img)
            }
            img.src = 'logo_rainbow_400.png'
        }) 
    }

    let loadWoodTexture = () => {
        return new Promise(function (resolve){
            let img = new Image()
            img.onload = () => {
                resolve(img)
            }
            img.src = 'wood.jpeg'
        }) 
    }

    Promise.all([loadLogoTexture(), loadWoodTexture()])
    .then((result) => {
        $t.logoTexture = result[0]
        $t.woodTexture = result[1]

        dice_initialize(container)
    })

}

function dice_initialize(container) {
    $t.remove($t.id('loading_text'));

    var canvas = container.querySelector('#canvas')
    // canvas.style.width = container.innerWidth - 1 + 'px';
    // canvas.style.height = container.innerHeight - 1 + 'px';
    canvas.style['touch-action'] = 'none';
    var selector_div = $t.id('selector_div');

    $t.dice.use_true_random = false;

    var box = new $t.dice.dice_box(canvas, { w: canvas.getBoundingClientRect().width, h: canvas.getBoundingClientRect().height });
    box.animate_selector = false;

    $t.bind(window, 'resize', function () {
        canvas.style.width = window.innerWidth - 1 + 'px';
        canvas.style.height = window.innerHeight - 1 + 'px';
        box.reinit(canvas, { w: canvas.getBoundingClientRect().width, h: canvas.getBoundingClientRect().height });
    });


    let throws = 0
    function before_roll(vectors, callback) {
        callback();
    }

    function after_roll(result) {
    }

    box.bind_mouse(container, before_roll, after_roll);
    box.bind_throw($t.id('throw'), before_roll, after_roll);

    function show_selector() {
        box.draw_selector();
    }
    $t.bind(container, ['mouseup', 'touchend'], function (ev) {
        ev.stopPropagation();
        event.preventDefault();
        if (selector_div.style.display == 'none') {
            if (!box.rolling) show_selector();
            box.rolling = false;
            return;
        }
    });

    window.addEventListener("touchmove", function(event) {
        if (event.target == canvas.querySelector('canvas')) {
          event.preventDefault();
        }
      }, false);

    show_selector();
}
