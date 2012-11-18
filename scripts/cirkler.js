requirejs(["vector", "render", "physics", "cirkel", "tools"],
function (vector, render, physics, cirkel) {
    
// Globals
var stats = {};

// Handle keyboard input
document.onkeypress = function(ev) {
    //console.log(ev.keyCode)
    switch(ev.keyCode) {
    case 38:
        bike.accelerating = true;
        break;
    case 40:
        bike.breaking = true;
        break;
    case 0:
        bike.swap();
        break;
    default:
        console.log("keyCode: " + ev.keyCode);
        break;
    }
};

document.onkeyup = function(ev) {
    switch(ev.keyCode) {
    case 38:
        bike.accelerating = false;
        break;
    case 40:
        bike.breaking = false;
        break;
    }
};

// Handle mouse input
var mouse = {
    clicked: false,
    pos: vector()
};

document.onmousedown = function(ev) {
    mouse.clicked = true;
    mouse.pos.x = ev.screenX;
    mouse.pos.y = ev.screenY;
};

document.onmouseup = function(ev) {
    mouse.clicked = false;
};

document.onmousemove = function(ev) {
    if (mouse.clicked) {
        render.moveView(-ev.screenX + mouse.pos.x, -ev.screenY + mouse.pos.y);
        mouse.pos.x = ev.screenX;
        mouse.pos.y = ev.screenY;
    }
};

var cirkler = [];

function init() {
    alert("lol");
  //function potens(n, e) {
  //    return (n ? n + potens(n, e-1) : 1);
  //}
  //alert(potens(2, 4));
    stats = new Stats();
    document.body.appendChild(stats.domElement);
    
    update();
}

function update() {
    render.clear();

    cirkler.forEach = function(cirkel) {
        cirkel.
    }

    render.blit();
    
    stats.update();
    window.requestAnimationFrame(update);
}

init();
});
