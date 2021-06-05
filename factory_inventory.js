colorTable = [0xFF0000, 0x00FF00, 0xfff200, 0x0000FF, 0x8800ff];
invIconSize = 4;
invIconLimit = 299;

class invResource {
    pol;
    delOnReach = false;
    del = false; //del on net available animUpdate()

    type = 0;
    posX = 0;
    posY = 0;
    targetX = 0;
    targetY = 0;

    constructor(type, x, y, ItargetX, ItargetY) {
        this.type = type;
        this.posX = x;
        this.posY = y;
        this.targetX = ItargetX;
        this.targetY = ItargetY;

        this.pol = new PIXI.Graphics();
        this.pol.beginFill(colorTable[this.type]);
        this.pol.drawRect(-invIconSize/2, -invIconSize/2, invIconSize, invIconSize);
        this.pol.endFill();
    }

    update() {
        this.posX = lerp(this.posX, this.targetX, 0.05);
        this.posY = lerp(this.posY, this.targetY, 0.05);
        this.pol.x = this.posX;
        this.pol.y = this.posY;
    };

    delete() {
        this.pol.destroy();
    }
}

class inventory {

    x = 16;
    y = 64;

    Resources = [0, 0, 0, 0, 0];
    ResourceGraphics = [];

    invGroup;

    constructor() {
        for(var i = 0; i < this.Resources.length; i++) {
            this.ResourceGraphics[i] = [];
        }
        this.invGroup = new PIXI.Container();
        this.invGroup.x = this.x;
        this.invGroup.y = this.y;
        app.stage.addChild(this.invGroup);

        for(var i = 0; i < 5; i++) {
            this.tex = new PIXI.Text('ERROR',{fontFamily : 'Arial', fontSize: 32, fill : 0xFFFFFF, align : 'center'});
            this.tex.x = 4;
            this.tex.y = -42 + i*(invIconSize*4*4);
            this.invGroup.addChild(this.tex);
        }
    }

    addResource(type, posX, posY) {
        this.Resources[type]++;

        this.newInvResource = new invResource(
            type, posX - this.invGroup.x, posY - this.invGroup.y,
            (Math.max(this.Resources[type]%75, 1)*invIconSize),
            (invIconSize*Math.min(Math.floor(this.Resources[type]/75), 4)) + type*(invIconSize*4*4),
        )
        this.ResourceGraphics[type].push(this.newInvResource);
        this.invGroup.addChild(this.newInvResource.pol);
        if(this.Resources[type] > invIconLimit) {
            this.newInvResource.delOnReach = true;
            this.newInvResource.targetX = (Math.max( Math.floor(Math.random()*75) , 1)*invIconSize);
            this.newInvResource.targetY = (invIconSize*Math.min(Math.floor(Math.random()*4), 4)) + type*(invIconSize*4*4);
        }

        this.updateResource(type);
    }

    updateResource(type) {
        this.typeLength = this.ResourceGraphics[type].length
        if(this.typeLength != this.Resources[type]) {
            if(this.typeLength > this.Resources[type]) { //if there are more graphics than resources
                this.toDel = this.typeLength - this.Resources[type];
                for(var i = 0; i < this.toDel; i++) { //first iter i is 0, then goes to toDel-1, meaning it clears everything at the end.
                    //first clear the pixi object then destroy array instance
                    this.ResourceGraphics[type][this.typeLength-i-1].del();
                    this.ResourceGraphics[type].pop();
                }
            }
        }
    }

    animUpdate() {
        for(var i = 0; i < this.ResourceGraphics.length; i++) {
            for(var y = 0; y < this.ResourceGraphics[i].length; y++) {
                this.obj = this.ResourceGraphics[i][y];
                if(this.obj.delOnReach == true) {
                    //console.log(this.ResourceTargets[i].length + " - " + this.ResourceGraphics[i].length);
                    //console.log(this.ResourceTargets[i][y]);
                    //console.log(y);
                    //console.log(this.ResourceGraphics[i]);
                    //console.log(this.ResourceTargets[i]);
                    
                    this.dist = Math.sqrt(Math.pow(this.obj.posX - this.obj.targetX, 2) + Math.pow(this.obj.posY - this.obj.targetY, 2));
                    if(this.dist < 0.25) {
                        this.obj.del = true;
                    }
                }
                this.obj.update();
            }
        }

        for(var i = this.ResourceGraphics.length-1; i >= 0; i--) {
            for(var y = this.ResourceGraphics[i].length-1; y >= 0; y--) {
                if(this.ResourceGraphics[i][y] != undefined) {
                    this.obj = this.ResourceGraphics[i][y];
                    if(this.obj.del == true) {
                        this.obj.delete();
                        this.ResourceGraphics[i].splice(y, 1);
                    }
                }
            }
        }

        for(var i = 0; i < 5; i++) {
            this.invGroup.children[i].text = this.Resources[i];
        }
        //debugText(this.Resources[0]);
        //if(this.ResourceGraphics[0][1500])
        //    debugText(this.ResourceGraphics[0][1500].delOnReach);
        //debugText(this.ResourceGraphics[0].length);
    }
}

inv = new inventory();