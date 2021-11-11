//code for handling temporary animations/objects that may appear

animObjects = [];

class animObject {
    pol;
    targetAlpha = 1;
    targetX = 0;
    targetY = 0;
}

class anim {
    static laser(x1, y1, x2, y2, r, g, b) {
        var index = animObjects.push(new animObject());
        var obj = animObjects[index-1];
        obj.pol = new PIXI.Graphics();
        obj.pol.lineStyle(3, rgbToHex(r, g, b))
        obj.pol.moveTo(x1, y1);
        obj.pol.lineTo(x2, y2);
        obj.targetAlpha = 0.1;
        app.stage.addChild(obj.pol);
    }

    static animUpdate() {
        for(var i = 0; i < animObjects.length; i++) {
            var obj = animObjects[i];
            obj.pol.alpha = lerp(obj.pol.alpha, obj.targetAlpha, 0.05);
            obj.pol.x = lerp(obj.pol.x, obj.targetX, 0.1);
            obj.pol.y = lerp(obj.pol.y, obj.targetY, 0.1);
            if(Math.abs(obj.pol.alpha - obj.targetAlpha) < 0.1 && Math.abs(obj.pol.x - obj.targetX) < 0.1 && Math.abs(obj.pol.y - obj.targetY) < 0.1) {
                obj.pol.destroy();
                animObjects.splice(i, 1);
            }
        }
    }
}