//entities, i.e. drones and buildings. Stuff you can craft.

entities = [];

class droneMK1 {
    x = 0;
    y = 0;
    energyCost = 5;

    sprit;
    pol = new PIXI.Container();

    cooldown = 1000;
    lastAction = 0;

    targetX = 0;
    targetY = 0;

    tileX = -1;
    tileY = -1;

    constructor(x, y) {
        app.stage.addChild(this.pol);
        this.sprit = new PIXI.Sprite(app.loader.resources["Resources/sprites/droneMK1.png"].texture);
        this.sprit.scale.x = 0.1;
        this.sprit.scale.y = 0.1;
        this.sprit.x = -this.sprit.texture.width/10/2;
        this.sprit.y = -this.sprit.texture.height/10;
        this.pol.addChild(this.sprit);

        energyUsed += this.energyCost;
        updateEnergy();

        var d = new Date();
        this.lastAction = d.getTime();
    }
    
    update() {
        var d = new Date();
        if(this.lastAction + this.cooldown < d.getTime()) {
            this.lastAction = this.lastAction + Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);

            if(!(this.tileX == -1 || this.tileY == -1)) {
                if(tiles[this.tileX][this.tileY].front == undefined) {
                    tiles[this.tileX][this.tileY].entity = undefined;
                    this.find()
                    tiles[this.tileX][this.tileY].entity = this;
                } else {
                    tiles[this.tileX][this.tileY].front.damage(1);
                }
            } else {
                this.find()
                tiles[this.tileX][this.tileY].entity = this;
            }
        }

        this.pol.x = lerp(this.pol.x, this.targetX, 0.1);
        this.pol.y = lerp(this.pol.y, this.targetY, 0.1);
    }

    //private
    find() {
        var found = false;
        var max = 100 - entities.length*0.5;
        while(!found) {
            var randomX = Math.round(Math.random()*(tiles.length-1));
            var randomY = Math.round(Math.random()*(tiles[0].length-1));
            if(tiles[randomX][randomY].entity == undefined && tiles[randomX][randomY].front != undefined) {
                found = true;
            } else {
                max--;
            }

            if(max < 1) {
                //give up after trying too much
                found = true;
            }
        }
        this.targetX = randomX*tileSize + tileGroup.x;
        this.targetY = randomY*tileSize + tileGroup.y;
        this.tileX = randomX;
        this.tileY = randomY;
    }

    del() {
        tiles[this.tileX][this.tileY].entity = undefined;
        energyUsed -= this.energyCost;
        this.sprit.destroy();
        this.pol.destroy();
    }
}

function addEntity(id) {
    switch(id) {
        case 0:
            entities.push(new droneMK1());
            break;
    }
}

function updateEntities() {
    for(var i = 0; i < entities.length; i++) {
        entities[i].update();
    }
}