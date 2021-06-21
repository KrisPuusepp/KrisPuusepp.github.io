//entities, i.e. drones and buildings. Stuff you can craft.

entityGroup = new PIXI.Container(); // Only used so the zIndex works
entityGroup.sortableChildren = true;
app.stage.addChild(entityGroup);

entities = [];
for(var i = 0; i < 10; i++) {
    entities[i] = [];
}

class droneMK1 { //slow breaker
    energyCost = 5;

    sprit;
    pol = new PIXI.Container();

    cooldown = 1000;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;

    constructor(x, y) {
        entityGroup.addChild(this.pol);
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
            this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);

            if(this.tileX == -1) {
                var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 5);
                if(resul.x != -1) {
                    this.tileX = resul.x;
                    this.tileY = resul.y;
                    this.targetX = this.tileX*tileSize+tileGroup.x;
                    this.targetY = this.tileY*tileSize+tileGroup.y;
                    tiles[this.tileX][this.tileY].entity = this;
                }
            } else {
                if(this.lookingFor.includes(tiles[this.tileX][this.tileY].frontType)) {
                    tiles[this.tileX][this.tileY].front.damage(1);
                } else {
                    var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 5);
                    if(resul.x != -1) {
                        tiles[this.tileX][this.tileY].entity = undefined;
                        this.tileX = resul.x;
                        this.tileY = resul.y;
                        this.targetX = this.tileX*tileSize+tileGroup.x;
                        this.targetY = this.tileY*tileSize+tileGroup.y;
                        tiles[this.tileX][this.tileY].entity = this;
                    }
                }
            }
        }

        if(Math.abs(this.lastAction - d.getTime()) > this.cooldown) {
            this.pol.x = this.targetX;
            this.pol.y = this.targetY;
        } else {
            this.pol.x = lerp(this.pol.x, this.targetX, 0.1);
            this.pol.y = lerp(this.pol.y, this.targetY, 0.1);
        }
    }

    del() {
        tiles[this.tileX][this.tileY].entity = undefined;
        energyUsed -= this.energyCost;
        updateEnergy();
        this.sprit.destroy();
        this.pol.destroy();
    }
}

class droneMK2 {
    energyCost = 20;

    sprit;
    pol = new PIXI.Container();

    cooldown = 2500;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;

    constructor(x, y) {
        entityGroup.addChild(this.pol);
        this.sprit = new PIXI.Sprite(app.loader.resources["Resources/sprites/droneMK2.png"].texture);
        this.sprit.scale.x = 0.15;
        this.sprit.scale.y = 0.15;
        this.sprit.x = -this.sprit.texture.width*0.15/2;
        this.sprit.y = -this.sprit.texture.height*0.15;
        this.pol.addChild(this.sprit);

        energyUsed += this.energyCost;
        updateEnergy();

        var d = new Date();
        this.lastAction = d.getTime();
    }
    
    update() {
        var d = new Date();
        if(this.lastAction + this.cooldown < d.getTime()) {
            this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);

            if(this.tileX == -1) {
                var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 10);
                if(resul.x != -1) {
                    this.tileX = resul.x;
                    this.tileY = resul.y;
                    this.targetX = this.tileX*tileSize+tileGroup.x;
                    this.targetY = this.tileY*tileSize+tileGroup.y;
                    tiles[this.tileX][this.tileY].entity = this;
                }
            } else {
                var damaged = false;
                for(var i = 0; i < 5; i++) {
                    for(var j = 0; j < 5; j++) {
                        var x = this.tileX-2+i;
                        var y = this.tileY-2+j;
                        if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length && this.lookingFor.includes(tiles[x][y].frontType)) {
                            damaged = true;
                            tiles[x][y].front.damage(1);
                        }
                    }
                }
                if(!damaged) {
                    var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 10);
                    if(resul.x != -1) {
                        tiles[this.tileX][this.tileY].entity = undefined;
                        this.tileX = resul.x;
                        this.tileY = resul.y;
                        this.targetX = this.tileX*tileSize+tileGroup.x;
                        this.targetY = this.tileY*tileSize+tileGroup.y;
                        tiles[this.tileX][this.tileY].entity = this;
                    }
                }
            }
        }

        if(Math.abs(this.lastAction - d.getTime()) > this.cooldown) {
            this.pol.x = this.targetX;
            this.pol.y = this.targetY;
        } else {
            this.pol.x = lerp(this.pol.x, this.targetX, 0.05);
            this.pol.y = lerp(this.pol.y, this.targetY, 0.05);
        }
    }

    del() {
        tiles[this.tileX][this.tileY].entity = undefined;
        energyUsed -= this.energyCost;
        updateEnergy();
        this.sprit.destroy();
        this.pol.destroy();
    }
}

class spawnerMK1 {
    energyCost = 20;

    sprit;
    pol = new PIXI.Container();

    cooldown = 2500;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;

    isSelected = false;
    mouseOn = false;

    constructor(x, y) {
        entityGroup.addChild(this.pol);
        this.sprit = new PIXI.Sprite(app.loader.resources["Resources/sprites/spawnerMK1.png"].texture);
        this.sprit.scale.x = 0.205;
        this.sprit.scale.y = 0.205;
        this.sprit.x = -this.sprit.texture.width*0.205/2;
        this.sprit.y = -this.sprit.texture.height*0.205/2;
        this.pol.addChild(this.sprit);

        energyUsed += this.energyCost;
        updateEnergy();

        var d = new Date();
        this.lastAction = d.getTime();

        this.pol.interactive = true;
        this.pol.on("mouseover", (event) => {
            if(buildingSelected == false) {
                this.mouseOn = true;
                changeCursor(1);
            }
        });
        this.pol.on("mouseout", (event) => {
            if(buildingSelected == false) {
                this.mouseOn = false;
                changeCursor(0);
            }
        });
        this.pol.on("click", (event) => {
            if(buildingSelected == false) {
                this.pol.zIndex = 1;
                buildingSelected = true;
                this.isSelected = true;
                gridUtil.clearEntities(this.tileX, this.tileY, 3);
            } else if(this.isSelected) {
                this.pol.zIndex = 0;
                if(this.tileX != -1) {
                    buildingSelected = false;
                    this.isSelected = false;
                    gridUtil.clearResources(this.tileX, this.tileY, 3);
                    gridUtil.setEntities(this.tileX, this.tileY, 3, this);
                } else {
                    buildingSelected = false;
                    this.isSelected = false;
                    var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 10);
                    if(resul.x != -1 && gridUtil.isEmptyEntity(resul.x, resul.y, 3)) {
                        this.tileX = resul.x;
                        this.tileY = resul.y;
                        this.targetX = this.tileX*tileSize+tileGroup.x;
                        this.targetY = this.tileY*tileSize+tileGroup.y;
                        gridUtil.clearResources(this.tileX, this.tileY, 3);
                        gridUtil.setEntities(this.tileX, this.tileY, 3, this);
                    }
                }
            }
        });
    }
    
    update() {
        var d = new Date();
        if(this.mouseOn || this.isSelected) {
            this.pol.filters = [new PIXI.filters.BloomFilter({})];
        } else if (this.pol.filters != null) {
            this.pol.filters = [];
        }
        if(this.lastAction + this.cooldown < d.getTime()) {
            this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);

            if(this.tileX == -1) {
                var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 10);
                if(resul.x != -1 && gridUtil.isEmptyEntity(resul.x, resul.y, 3)) {
                    this.tileX = resul.x;
                    this.tileY = resul.y;
                    this.targetX = this.tileX*tileSize+tileGroup.x;
                    this.targetY = this.tileY*tileSize+tileGroup.y;
                    gridUtil.clearResources(this.tileX, this.tileY, 3);
                    gridUtil.setEntities(this.tileX, this.tileY, 3, this);
                }
            } else if(!this.isSelected) {
                var damaged = false;
                for(var i = 0; i < 11; i++) {
                    for(var j = 0; j < 11; j++) {
                        var x = this.tileX-5+i;
                        var y = this.tileY-5+j;
                        if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length && this.lookingFor.includes(tiles[x][y].frontType)) {
                            damaged = true;
                            tiles[x][y].front.damage(2);
                        }
                    }
                }
            }
        }

        if(this.isSelected) {
            var mousePosition = input.mouse.global;
            if(mousePosition.x != null) {
                //clamp the values to the grid
                var cx = Math.round((mousePosition.x - tileGroup.x) / tileSize);
                var cy = Math.round((mousePosition.y - tileGroup.y) / tileSize);
                cx = Math.min(Math.max((cx), 0), tiles.length);
                cy = Math.min(Math.max((cy), 0), tiles[0].length);
                if(gridUtil.isEmptyEntity(cx, cy, 3)) {
                    this.tileX = cx;
                    this.tileY = cy;
                    this.targetX = cx*tileSize+tileGroup.x;
                    this.targetY = cy*tileSize+tileGroup.y;
                } else {
                    this.pol.filters = [new PIXI.filters.ColorOverlayFilter(0x000000)];
                    this.tileX = -1;
                    this.targetX = cx*tileSize+tileGroup.x;
                    this.targetY = cy*tileSize+tileGroup.y;
                }
            }
        }
        
        this.pol.x = lerp(this.pol.x, this.targetX, 0.75);
        this.pol.y = lerp(this.pol.y, this.targetY, 0.75);
    }

    del() {
        tiles[this.tileX][this.tileY].entity = undefined;
        energyUsed -= this.energyCost;
        updateEnergy();
        this.sprit.destroy();
        this.pol.destroy();
    }
}

function addEntity(id) {
    switch(id) {
        case 0:
            entities[id].push(new droneMK1());
            break;
        case 1:
            entities[id].push(new droneMK2());
            break;
        case 2:
            entities[id].push(new droneMK3());
            break;
        case 3:
            entities[id].push(new droneMK4());
            break;
        case 4:
            entities[id].push(new droneMK5());
            break;

        case 5:
            entities[id].push(new spawnerMK1());
            break;
    }
}

function delEntity(id) {
    var ent = entities[id].pop();
    ent.del();
}

function updateEntities() {
    for(var i = 0; i < entities.length; i++) {
        for(var j = 0; j < entities[i].length; j++) {
            entities[i][j].update();
        }
    }
}

//for shuffling finding arrays
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }