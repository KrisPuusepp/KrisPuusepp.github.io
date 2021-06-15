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

    lookingFor = [0];

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
            this.lastAction += Math.min(Math.abs(this.lastAction - d.getTime()), this.cooldown);

            if(this.tileX == -1) {
                var resul = find(this.tileX, this.tileY, this.lookingFor, 5);
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
                    var resul = find(this.tileX, this.tileY, this.lookingFor, 5);
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
        this.sprit.destroy();
        this.pol.destroy();
    }
}

function find(tileX, tileY, type, findLength) {
    if(!(tileX == -1 || tileY == -1)) {
        var shuffledFound = false;
        var findShuffled = [];
        var index = 0;
        var OtileX; //output vars
        var OtileY; //output vars
        for(var li = 0; li < findLength; li++) {
            for(var ly = 0; ly < findLength; ly++) {
                findShuffled[index] = {x: li, y: ly};
                index++;
            }
        }
        var midPoint = Math.floor((findLength-1)/2);
        shuffle(findShuffled);
        for(var i = 0; i < findShuffled.length; i++) {
            if(findShuffled[i].x+tileX-midPoint >= 0 && findShuffled[i].y+tileY-midPoint >= 0 && findShuffled[i].x+tileX-midPoint < tiles.length && findShuffled[i].y+tileY-midPoint < tiles[0].length && shuffledFound == false) {
                if(tiles[findShuffled[i].x+tileX-midPoint][findShuffled[i].y+tileY-midPoint].entity == undefined && tiles[findShuffled[i].x+tileX-midPoint][findShuffled[i].y+tileY-midPoint].front != undefined) {
                    OtileX = findShuffled[i].x+tileX-midPoint;
                    OtileY = findShuffled[i].y+tileY-midPoint;
                    shuffledFound = true;
                }
            }
        }
        if(!shuffledFound) {
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
                    OtileX = tileX; 
                    OtileY = tileY;
                    found = true;
                }
            }
            OtileX = randomX;
            OtileY = randomY;
        }
    }
    else {
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
        OtileX = randomX;
        OtileY = randomY;
    }
    return {
        x: OtileX,
        y: OtileY,
    };
}

function find(tileX, tileY, type, findLength) {
    if(tileX == -1) {
        var max = 100 - entities.length*0.5;
        while(true) {
            var randomX = Math.round(Math.random()*(tiles.length-1));
            var randomY = Math.round(Math.random()*(tiles[0].length-1));
            if(tiles[randomX][randomY].entity == undefined && type.includes(tiles[randomX][randomY].frontType)) {
                return {
                    x: randomX,
                    y: randomY,
                };
            } else {
                max--;
            }

            if(max < 1) {
                return {
                    x: -1,
                    y: -1,
                };
            }
        }
    } else {
        var findShuffled = [];
        var index = 0;
        for(var li = 0; li < findLength; li++) {
            for(var ly = 0; ly < findLength; ly++) {
                findShuffled[index] = {x: li, y: ly};
                index++;
            }
        }
        var midPoint = Math.floor((findLength-1)/2);
        shuffle(findShuffled);
        for(var i = 0; i < findShuffled.length; i++) {
            var x = findShuffled[i].x+tileX-midPoint;
            var y = findShuffled[i].y+tileY-midPoint;
            if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length) {
                if(tiles[x][y].entity == undefined && type.includes(tiles[x][y].frontType)) {
                    return {
                        x: x,
                        y: y,
                    };
                }
            }
        }

        //if return still hasnt been called then just check lots of spots randomly
        var max = 100 - entities.length*0.5;
        while(true) {
            var randomX = Math.round(Math.random()*(tiles.length-1));
            var randomY = Math.round(Math.random()*(tiles[0].length-1));
            if(tiles[randomX][randomY].entity == undefined && type.includes(tiles[randomX][randomY].frontType)) {
                return {
                    x: randomX,
                    y: randomY,
                };
            } else {
                max--;
            }

            if(max < 1) {
                return {
                    x: -1,
                    y: -1,
                };
            }
        }
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