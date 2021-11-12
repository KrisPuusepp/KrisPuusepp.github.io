muted = true;

currentKliks = 0;
currentEnds = 0;

kliks = [];
for(var i = 1; i <= 15; i++) {
    kliks[i-1] = new Audio("./Resources/audio/klik" + i + ".ogg");
}
function randomKlik() {
    if(!muted && currentKliks < 10 && frame > 30) {
        current = kliks[Math.round(Math.random()*14)].cloneNode();
        current.volume = Math.random()/256 + 0.01;
        current.play();
        currentKliks++;
        setTimeout(() => {
            currentKliks--;
        }, 150);
    }
}

ends = [];
for(var i = 1; i < 2; i++) {
    ends[i-1] = new Audio("./Resources/audio/end" + i + ".ogg");
}
function randomEnd() {
    if(!muted && currentEnds < 2 && frame > 30) {
        current = ends[Math.round(Math.random()*0)].cloneNode();
        current.volume = Math.random()/8 + 0.2;
        current.play();
        currentEnds++;
        setTimeout(() => {
            currentEnds--;
        }, 150);
    }
}