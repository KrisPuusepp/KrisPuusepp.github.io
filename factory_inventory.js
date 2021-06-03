class inventory {

    x = 100;
    y = 100;

    invIconSize = 10;

    colorTable = [0xFF0000, 0x00FF00, 0xfff200, 0x0000FF, 0x8800ff];

    Resources = [0, 0, 0, 0, 0];
    ResourceGraphics = [];

    invGroup = new PIXI.Container();

    constructor() {
        for(var i = 0; i < this.Resources.length; i++) {
            this.ResourceGraphics[i] = [];
        }

        app.stage.addChild(this.invGroup);

        console.log("Inventory init completed");
    }

    addResource(type, posX, posY) {
        this.typeLength = this.ResourceGraphics[type].length
        this.Resources[type]++;
        this.updateResource(type);
        this.res = this.ResourceGraphics[type][this.ResourceGraphics[type].length-1];
        this.res.position = {x: posX, y: posY};
        this.res.targetPosition = {x: this.x + (Math.max(this.Resources[type]%10, 1)*this.invIconSize), 
                                   y: this.y + (this.invIconSize*Math.floor(this.Resources[type]/10))};
    }

    updateResource(type) {
        this.typeLength = this.ResourceGraphics[type].length
        if(this.typeLength != this.Resources[type]) {
            if(this.typeLength > this.Resources[type]) { //if there are more graphics than resources
                this.toDel = this.typeLength - this.Resources[type];
                for(var i = 0; i < this.toDel; i++) { //first iter i is 0, then goes to toDel-1, meaning it clears everything at the end.
                    //first clear the pixi object then destroy array instance
                    this.ResourceGraphics[type][this.typeLength-i-1].destroy();
                    this.ResourceGraphics[type].pop();
                }
            } else {
                this.toAdd = this.Resources[type] - this.typeLength;
                for(var i = 0; i < this.toAdd; i++) {
                    this.addGraphic(type);
                }
            }
        }
    }

    addGraphic(type) {
        this.g = new PIXI.Graphics();

        this.g.beginFill(this.colorTable[type]);
        this.g.drawRect(-this.invIconSize/2, -this.invIconSize/2, this.invIconSize, this.invIconSize);
        this.g.endFill();

        this.invGroup.addChild(this.g);
        this.ResourceGraphics[type].push(this.g);
    }

    animUpdate() {
        for(var i = 0; i < this.ResourceGraphics.length; i++) {
            for(var y = 0; y < this.ResourceGraphics[i].length; y++) {
                this.pol = this.ResourceGraphics[i][y];
                this.pol.x = lerp(this.pol.x, this.pol.targetPosition.x, 0.1);
                this.pol.y = lerp(this.pol.y, this.pol.targetPosition.y, 0.1);
            }
        }
    }
}

inv = new inventory();