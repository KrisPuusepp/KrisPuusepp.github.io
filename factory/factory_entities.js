//entities, i.e. drones and buildings. Stuff you can craft.

entityGroup = new PIXI.Container(); // Only used so the zIndex works
entityGroup.sortableChildren = true;
world.addChild(entityGroup);

entities = [];

class droneMK1 { //slow breaker
    energyCost = 5;

    sprit;
    pol = new PIXI.Container();
    objIndex = 0;

    cooldown = 1000;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;

    mouseOn = false;

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

        this.sprit.interactive = true;
        this.sprit.on("mouseover", (event) => {
            if(selectedEntity == false && this.objIndex >= 0) {
                this.mouseOn = true;
                changeCursor(1);
            }
        });
        this.sprit.on("mouseout", (event) => {
            if(this.objIndex >= 0) {
                this.mouseOn = false;
                changeCursor(0);
            }
        });
        this.sprit.on("click", (event) => {
            if(this.objIndex >= 0) {
                this.del();
            }
        });
    }
    
    update() {
        var d = new Date();
        if(this.mouseOn) {
            this.pol.filters = [new PIXI.filters.BloomFilter({})];
        } else if (this.pol.filters && this.pol.filters.length != 0) {
            this.pol.filters = [];
        }
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
                    var tile = tiles[this.tileX][this.tileY].front;
                    anim.laser(this.pol.x, this.pol.y-10, tile.pol.x+tileGroup.x, tile.pol.y+tileGroup.y+4, 150, 0, 25);
                    tile.damage(1);
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
        for(var i = 0; i < 10; i++) {
            let time = i;
            setTimeout(() => {
                this.pol.alpha = 1-(time/10);
            }, 100*time);
        }
        setTimeout(() => {
            this.sprit.destroy();
            this.pol.destroy();
        }, 100*11);
        entities[this.objIndex] = null;
        this.objIndex = -1;
    }
}

class droneMK2 { //area of effect breaker
    energyCost = 20;

    sprit;
    pol = new PIXI.Container();
    objIndex = 0;

    cooldown = 2000;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;

    mouseOn = false;

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

        this.sprit.interactive = true;
        this.sprit.on("mouseover", (event) => {
            if(selectedEntity == false && this.objIndex >= 0) {
                this.mouseOn = true;
                changeCursor(1);
            }
        });
        this.sprit.on("mouseout", (event) => {
            if(this.objIndex >= 0) {
                this.mouseOn = false;
                changeCursor(0);
            }
        });
        this.sprit.on("click", (event) => {
            if(this.objIndex >= 0) {
                this.del();
            }
        });
    }
    
    update() {
        var d = new Date();
        if(this.mouseOn) {
            this.pol.filters = [new PIXI.filters.BloomFilter({})];
        } else if (this.pol.filters && this.pol.filters.length != 0) {
            this.pol.filters = [];
        }
        if(this.lastAction + this.cooldown < d.getTime()) {

            if(this.tileX == -1) {
                this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);
                var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 14);
                if(resul.x != -1) {
                    this.tileX = resul.x;
                    this.tileY = resul.y;
                    this.targetX = this.tileX*tileSize+tileGroup.x;
                    this.targetY = this.tileY*tileSize+tileGroup.y;
                    tiles[this.tileX][this.tileY].entity = this;
                }
            } else {
                var damaged = false;
                var damagedAmount = 0;
                for(var i = 0; i < 7; i++) {
                    for(var j = 0; j < 7; j++) {
                        var x = this.tileX-4+i;
                        var y = this.tileY-4+j;
                        if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length && this.lookingFor.includes(tiles[x][y].frontType) && damagedAmount < 2) {
                            damaged = true;
                            damagedAmount++;
                            var tile = tiles[x][y].front;
                            if(damagedAmount == 1) {
                                anim.laser(this.pol.x-18, this.pol.y-12, tile.pol.x+tileGroup.x, tile.pol.y+tileGroup.y, 150, 0, 25);
                            } else {
                                anim.laser(this.pol.x+18, this.pol.y-12, tile.pol.x+tileGroup.x, tile.pol.y+tileGroup.y, 150, 0, 25);
                            }
                            tile.damage(1);
                        }
                    }
                }
                if(!damaged) {
                    this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);
                    var resul = gridUtil.findResource(this.tileX, this.tileY, this.lookingFor, 14);
                    if(resul.x != -1) {
                        tiles[this.tileX][this.tileY].entity = undefined;
                        this.tileX = resul.x;
                        this.tileY = resul.y;
                        this.targetX = this.tileX*tileSize+tileGroup.x;
                        this.targetY = this.tileY*tileSize+tileGroup.y;
                        tiles[this.tileX][this.tileY].entity = this;
                    }
                } else {
                    this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown/30);
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
        for(var i = 0; i < 10; i++) {
            let time = i;
            setTimeout(() => {
                this.pol.alpha = 1-(time/10);
            }, 100*time);
        }
        setTimeout(() => {
            this.sprit.destroy();
            this.pol.destroy();
        }, 100*11);
        entities[this.objIndex] = null;
        this.objIndex = -1;
    }
}

class droneMK3 { //red n yellow spawner
    energyCost = 5;

    sprit;
    pol = new PIXI.Container();
    objIndex = 0;

    cooldown = 500;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    //lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;

    mouseOn = false;

    constructor(x, y) {
        entityGroup.addChild(this.pol);
        this.sprit = new PIXI.Sprite(app.loader.resources["Resources/sprites/droneMK3.png"].texture);
        this.sprit.scale.x = 0.15;
        this.sprit.scale.y = 0.15;
        this.sprit.x = -this.sprit.texture.width*0.15/2;
        this.sprit.y = -this.sprit.texture.height*0.15;
        this.pol.addChild(this.sprit);

        energyUsed += this.energyCost;
        updateEnergy();

        var d = new Date();
        this.lastAction = d.getTime();

        this.sprit.interactive = true;
        this.sprit.on("mouseover", (event) => {
            if(selectedEntity == false && this.objIndex >= 0) {
                this.mouseOn = true;
                changeCursor(1);
            }
        });
        this.sprit.on("mouseout", (event) => {
            if(this.objIndex >= 0) {
                this.mouseOn = false;
                changeCursor(0);
            }
        });
        this.sprit.on("click", (event) => {
            if(this.objIndex >= 0) {
                this.del();
            }
        });
    }
    
    update() {
        var d = new Date();
        if(this.mouseOn) {
            this.pol.filters = [new PIXI.filters.BloomFilter({})];
        } else if (this.pol.filters && this.pol.filters.length != 0) {
            this.pol.filters = [];
        }
        if(this.lastAction + this.cooldown < d.getTime()) {
            this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);

            if(this.tileX == -1) {
                var resul = gridUtil.findEmpty(this.tileX, this.tileY, 3);
                if(resul.x != -1) {
                    this.tileX = resul.x;
                    this.tileY = resul.y;
                    this.targetX = this.tileX*tileSize+tileGroup.x;
                    this.targetY = this.tileY*tileSize+tileGroup.y;
                    tiles[this.tileX][this.tileY].entity = this;
                }
            } else {
                if(tiles[this.tileX][this.tileY].front == undefined) {
                    spawnResource(this.tileX, this.tileY, 0, false);
                    var tile = tiles[this.tileX][this.tileY].front;
                    anim.laser(this.pol.x+20, this.pol.y-5, tile.pol.x+tileGroup.x, tile.pol.y+tileGroup.y+4, 150, 0, 25);
                    anim.laser(this.pol.x-20, this.pol.y-5, tile.pol.x+tileGroup.x, tile.pol.y+tileGroup.y+4, 150, 0, 25);
                } else {
                    var resul = gridUtil.findEmpty(this.tileX, this.tileY, 3);
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
            this.pol.x = lerp(this.pol.x, this.targetX, 0.25);
            this.pol.y = lerp(this.pol.y, this.targetY, 0.25);
        }
    }

    del() {
        tiles[this.tileX][this.tileY].entity = undefined;
        energyUsed -= this.energyCost;
        updateEnergy();
        for(var i = 0; i < 10; i++) {
            let time = i;
            setTimeout(() => {
                this.pol.alpha = 1-(time/10);
            }, 100*time);
        }
        setTimeout(() => {
            this.sprit.destroy();
            this.pol.destroy();
        }, 100*11);
        entities[this.objIndex] = null;
        this.objIndex = -1;
    }
}

class buildingMK1 { //powerful breaker
    energyCost = 20;

    areaSize = {x: 0, y: 0} // SET THIS
    type = "building"; //SET THIS FOR OTHERS

    area;
    sprit;
    pol = new PIXI.Container();
    objIndex = 0;

    cooldown = 2500;
    lastAction = 0;

    tileX = -1;
    tileY = -1;

    lookingFor = [0, 1];

    //for anim
    targetX = 0;
    targetY = 0;
    targetAlpha = 0.01;

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

        this.area = new PIXI.Graphics();
        this.area.beginFill(0xFF0000);
        this.area.drawRect(0, 0, tileSize*11, tileSize*11);
        this.area.position = {x: -tileSize*5.5, y: -tileSize*5.5};
        this.area.endFill();
        this.area.alpha = 0.025;
        this.pol.addChild(this.area);

        energyUsed += this.energyCost;
        updateEnergy();

        var d = new Date();
        this.lastAction = d.getTime();

        this.sprit.interactive = true;
        this.sprit.on("mouseover", (event) => {
            if(selectedEntity == false && this.objIndex >= 0) {
                this.mouseOn = true;
                changeCursor(1);
            }
        });
        this.sprit.on("mouseout", (event) => {
            if(selectedEntity == false && this.objIndex >= 0) {
                this.mouseOn = false;
                changeCursor(0);
            }
        });
        this.sprit.on("click", (event) => {
            if(this.objIndex >= 0) {
                if(selectedEntity == false) {
                    this.pol.zIndex = 1;
                    selectedEntity = true;
                    selecting = this;
                    this.isSelected = true;
                    gridUtil.clearEntities(this.tileX, this.tileY, 3);
                } else if(this.isSelected) {
                    this.pol.zIndex = 0;
                    if(this.tileX != -1) {
                        selectedEntity = false;
                        selecting = undefined;
                        this.isSelected = false;
                        gridUtil.clearResources(this.tileX, this.tileY, 3);
                        gridUtil.setEntities(this.tileX, this.tileY, 3, this);
                    } else {
                        selectedEntity = false;
                        selecting = undefined;
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
            }
        });
    }
    
    update() {
        var d = new Date();
        if(this.mouseOn || this.isSelected) {
            this.pol.filters = [new PIXI.filters.BloomFilter({})];
            this.targetAlpha = 0.05;
        } else if (this.pol.filters && this.pol.filters.length != 0) {
            this.pol.filters = [];
            this.targetAlpha = 0.025;
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
                for(var i = 0; i < 11; i++) {
                    for(var j = 0; j < 11; j++) {
                        var x = this.tileX-5+i;
                        var y = this.tileY-5+j;
                        if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length && this.lookingFor.includes(tiles[x][y].frontType)) {
                            tiles[x][y].front.damage(10);
                        }
                    }
                }
                this.targetAlpha = 0.15;
                setTimeout(() => {
                    if(this)
                        this.targetAlpha = 0.025;
                }, 200);
            }
        }

        if(this.isSelected) {
            var mousePosition = Object.assign({}, input.mouse.global);
            mousePosition.x /= world.scale.x;
            mousePosition.y /= world.scale.y;
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
        this.area.alpha = lerp(this.area.alpha, this.targetAlpha, 0.1);
    }

    del() {
        if(selecting == this) {
            selectedEntity = false;
            selecting = undefined;
        }

        gridUtil.clearEntities(this.tileX, this.tileY, 3);
        energyUsed -= this.energyCost;
        updateEnergy();
        for(var i = 0; i < 10; i++) {
            let time = i;
            setTimeout(() => {
                this.pol.alpha = 1-(time/10);
            }, 100*time);
        }
        setTimeout(() => {
            this.sprit.destroy();
            this.pol.destroy();
        }, 100*11);
        entities[this.objIndex] = null;
        this.objIndex = -1;
    }
}

function addEntity(id) {
    switch(id) {
        case 0:
            var newObjIndex = entities.push(new droneMK1());
            var newObj = entities[newObjIndex-1];
            newObj.objIndex = newObjIndex-1;
            break;
        case 1:
            var newObjIndex = entities.push(new droneMK2());
            var newObj = entities[newObjIndex-1];
            newObj.objIndex = newObjIndex-1;
            break;
        case 2:
            var newObjIndex = entities.push(new droneMK3());
            var newObj = entities[newObjIndex-1];
            newObj.objIndex = newObjIndex-1;
            break;
        case 3:
            var newObjIndex = entities.push(new droneMK4());
            var newObj = entities[newObjIndex-1];
            newObj.objIndex = newObjIndex-1;
            break;
        case 4:
            var newObjIndex = entities.push(new droneMK5());
            var newObj = entities[newObjIndex-1];
            newObj.objIndex = newObjIndex-1;
            break;

        case 5:
            var newObjIndex = entities.push(new buildingMK1());
            var newObj = entities[newObjIndex-1];
            newObj.objIndex = newObjIndex-1;
            break;
    }
}

function updateEntities() {
    for(var i = 0; i < entities.length; i++) {
        if(entities[i] != null)
            entities[i].update();
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