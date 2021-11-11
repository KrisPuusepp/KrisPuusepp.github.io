colorTable = [0xFF0000, 0x00FF00, 0xfff200, 0x00E5FF, 0x8800ff];
invIconSize = 4;
invIconLimit = 399;

class invResource {
    pol;
    delOnReach = false;
    del = false; //del on net available animUpdate()

    type = 0;
    posX = 0;
    posY = 0;
    targetX = 0;
    targetY = 0;

    spawnFrame = 0;

    constructor(type, x, y, ItargetX, ItargetY) {
        this.type = type;
        this.posX = x;
        this.posY = y;
        this.targetX = ItargetX;
        this.targetY = ItargetY;

        this.spawnFrame = frame;

        this.pol = new PIXI.Graphics();
        this.pol.beginFill(colorTable[this.type]);
        this.pol.drawRect(-invIconSize/2, -invIconSize/2, invIconSize, invIconSize);
        this.pol.endFill();

        this.pol.scale.x = 6;
        this.pol.scale.y = 6;
    }

    update() {
        if(frame - this.spawnFrame < 64) {
            this.posX = lerp(this.posX, this.targetX, Math.pow(frame - this.spawnFrame, 3) / 500000);
            this.posY = lerp(this.posY, this.targetY, Math.pow(frame - this.spawnFrame, 3) / 500000);
            this.pol.scale.x = lerp(this.pol.scale.x, 1, (frame - this.spawnFrame, 2) / 20);
            this.pol.scale.y = lerp(this.pol.scale.y, 1, (frame - this.spawnFrame, 2) / 20);
            this.pol.x = this.posX;
            this.pol.y = this.posY;
        }
    };

    delete() {
        this.pol.destroy();
    }
}

class inventory {

    x = 3;
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
            this.tex = new PIXI.Text('ERROR',{fontFamily : 'mainFont', fontSize: 32, fill : 0xFFFFFF, align : 'center'});
            this.tex.x = 512;
            this.tex.y = -42 + i*(invIconSize*4*4);
            this.tex.alpha = 0;
            this.invGroup.addChild(this.tex);
        }
    }

    addResource(type, posX, posY) {
        this.Resources[type]++;

        this.newInvResource = new invResource(
            type, posX - this.invGroup.x, posY - this.invGroup.y,
            (Math.max(this.Resources[type]%100, 1)*invIconSize),
            (invIconSize*Math.min(Math.floor(this.Resources[type]/100), 4)) + type*(invIconSize*4*4),
        )
        this.ResourceGraphics[type].push(this.newInvResource);
        this.invGroup.addChild(this.newInvResource.pol);
        if(this.Resources[type] > invIconLimit) {
            this.newInvResource.delOnReach = true;
            this.newInvResource.targetX = (Math.max( Math.floor(Math.random()*100) , 1)*invIconSize);
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
        
        ProgressCheck(this);
    }
}

inv = new inventory();


//Honestly, i dont know why i made inventory a class. Thats why inv is a class and why the rest of this .js isnt... oh well

maxEnergy = 15;
energyUsed = 0;

energyGroup = new PIXI.Container(); //Mostly only used for fading it in. see progression.js
energyGroup.alpha = 0;
energyGroup.x = 512;
app.stage.addChild(energyGroup);

energyEmpt = new PIXI.Graphics();
energyEmpt.beginFill(0x2E2E2E);
energyEmpt.drawPolygon([
    -0, -30,
    20, -30,
    5, -5,
    15, -5,
    -10, 30,
    0, 5,
    -10, 5
]);
energyEmpt.drawCircle(-100, -100, 10);
energyEmpt.drawCircle(100, -100, 10);
energyEmpt.drawCircle(-100, 5000, 10);
energyEmpt.drawCircle(100, 5000, 10);
energyEmpt.endFill();
energyEmpt.x = 640;
energyEmpt.y = 54;
energyGroup.addChild(energyEmpt);

energyIcon = new PIXI.Graphics();
energyIcon.beginFill(0xFFFF00);
energyIcon.drawPolygon([
    -0, -30,
    20, -30,
    5, -5,
    15, -5,
    -10, 30,
    0, 5,
    -10, 5
]);
energyIcon.drawCircle(-100, -100, 10);
energyIcon.drawCircle(100, -100, 10);
energyIcon.drawCircle(-100, 5000, 10);
energyIcon.drawCircle(100, 5000, 10);
energyIcon.endFill();
energyIcon.x = 640;
energyIcon.y = 54;
energyIcon.filters = [new PIXI.filters.AdvancedBloomFilter({threshold: 0, brightness:8, bloomScale:1, blur: 1, quality: 8})];
energyGroup.addChild(energyIcon);


energyMask = new PIXI.Graphics();
energyMask.beginFill(0x8bc5ff, 0.4);
energyMask.drawRect(640 - 50, 54 + 50, 100, 100);
energyMask.endFill();
energyMask.x = 640;
energyMask.y = 54; //btw the mask is set in progression.js so it doesnt interfere with it moving into place

energyText = new PIXI.Text('',{fontFamily : "mainFont", fontSize: 32, fill : 0xFFFF00, align : 'center'});
energyText.x = 690;
energyText.y = 54-16;
energyText.filters = [new PIXI.filters.AdvancedBloomFilter({threshold: 0, brightness:8, bloomScale:1, blur: 1, quality: 8})];
energyGroup.addChild(energyText);

function updateEnergy() {
    //level is between 0-1
    level = 1 - (energyUsed/maxEnergy);
    energyMask.clear();
    energyMask.beginFill(0x8bc5ff, 0.4);
    energyMask.drawRect(640 - 50, 54 + 30 - 60*level, 100, 100);
    energyMask.endFill();
    energyMask.x = 640;
    energyMask.y = 54;

    energyText.text = energyUsed + "/" + maxEnergy;
}