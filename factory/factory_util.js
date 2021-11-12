class gridUtil {
    static isEmptyFront(tileX, tileY, objectLength = 1) {
        var midPoint = Math.floor((objectLength-1)/2);
        for(var i = 0; i < objectLength; i++) {
            for(var j = 0; j < objectLength; j++) {
                var x = i+tileX-midPoint;
                var y = j+tileY-midPoint;
                if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length) {
                    if(tiles[x][y].front != undefined) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    static isEmptyEntity(tileX, tileY, objectLength = 1) {
        var midPoint = Math.floor((objectLength-1)/2);
        for(var i = 0; i < objectLength; i++) {
            for(var j = 0; j < objectLength; j++) {
                var x = i+tileX-midPoint;
                var y = j+tileY-midPoint;
                if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length) {
                    if(tiles[x][y].entity != undefined) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    static clearResources(tileX, tileY, objectLength = 1) {
        var midPoint = Math.floor((objectLength-1)/2);
        for(var i = 0; i < objectLength; i++) {
            for(var j = 0; j < objectLength; j++) {
                var x = i+tileX-midPoint;
                var y = j+tileY-midPoint;
                if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length) {
                    if(tiles[x][y].front != undefined) {
                        tiles[x][y].front.del();
                        tiles[x][y].front = undefined;
                    }
                }
            }
        }
    }
    static setEntities(tileX, tileY, objectLength = 1, object) {
        var midPoint = Math.floor((objectLength-1)/2);
        for(var i = 0; i < objectLength; i++) {
            for(var j = 0; j < objectLength; j++) {
                var x = i+tileX-midPoint;
                var y = j+tileY-midPoint;
                if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length) {
                    if(tiles[x][y].entity == undefined) {
                        tiles[x][y].entity = object;
                    }
                }
            }
        }
    }
    static clearEntities(tileX, tileY, objectLength = 1, object) {
        var midPoint = Math.floor((objectLength-1)/2);
        for(var i = 0; i < objectLength; i++) {
            for(var j = 0; j < objectLength; j++) {
                var x = i+tileX-midPoint;
                var y = j+tileY-midPoint;
                if(x >= 0 && y >= 0 && x < tiles.length && y < tiles[0].length) {
                    if(tiles[x][y].entity != undefined) {
                        tiles[x][y].entity = undefined;
                    }
                }
            }
        }
    }
    static findResource(tileX, tileY, type, findLength) {
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
    static findEmpty(tileX, tileY, findLength) {
        if(tileX == -1) {
            var max = 100 - entities.length*0.5;
            while(true) {
                var randomX = Math.round(Math.random()*(tiles.length-1));
                var randomY = Math.round(Math.random()*(tiles[0].length-1));
                if(tiles[randomX][randomY].entity == undefined && tiles[randomX][randomY].front == undefined) {
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
                    if(tiles[x][y].entity == undefined && tiles[x][y].front == undefined) {
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
                if(tiles[randomX][randomY].entity == undefined && tiles[randomX][randomY].front == undefined) {
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
}