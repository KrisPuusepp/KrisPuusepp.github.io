faded = [false, false, false, false, false];
energyFaded = false;

function ProgressCheck(iv) {
    for(var i = 0; i < iv.Resources.length; i++) {
        if(!faded[i] && iv.Resources[i]>0) {
            iv.invGroup.children[i].alpha = lerp(iv.invGroup.children[i].alpha, 1, 0.01);
            iv.invGroup.children[i].x = lerp(iv.invGroup.children[i].x, 4, 0.01);
            if(iv.invGroup.children[i].alpha > 0.96 && Math.abs(iv.invGroup.children[i].x - 4) < 0.2) {
                iv.invGroup.children[i].x = 4;
                iv.invGroup.children[i].alpha = 1;
                faded[i] = true;
            }
        }
    }
    if(!energyFaded && iv.Resources[0] > 20) {
        energyGroup.alpha = lerp(energyGroup.alpha, 0.1, 0.01);
        energyGroup.x = lerp(energyGroup.x, 0, 0.01);
        if(energyGroup.x < 1) {
            energyGroup.alpha = 1;
            energyGroup.x = 0;
            energyIcon.mask = energyMask;
            energyFaded = true;
        }
    }
}

naturalMax = []; //max naturally spawned resources
for(var i = 0; i < 5; i++) {
    naturalMax[i] = 256;
}
natural = []; //currently spawned natural resources
for(var i = 0; i < 5; i++) {
    natural[i] = 0;
}
function spawnCheck() {
    for(var i = 0; i < 1; i++) {
        for(var j = 0; j < 10; j++) {
            if(natural[i] < naturalMax[i]) {
                spawnCluster(Math.max(Math.round(Math.random()*tiles.length)-5, 0), Math.max(Math.round(Math.random()*tiles[0].length)-5, 0), i);
            } else {
                j = 10;
            }
        }
    }
}