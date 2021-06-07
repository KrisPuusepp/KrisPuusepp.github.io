faded = [false, false, false, false, false];

function invProgressCheck(iv) {
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
}