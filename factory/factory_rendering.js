//setup
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)
//Create a Pixi Application
stageWidth = 1920;
stageHeight = 1080;
console.log("Detected Width: " + innerWidth + ", Detected Height: " + innerHeight);
let app = new PIXI.Application({width: stageWidth, height: stageHeight, antialias: true, backgroundColor: 0x1E1E1E});
var world = new PIXI.Container();
app.stage.addChild(world);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
//resize to window
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
tileSize = stageWidth/64/1.3;
tileGroup = new PIXI.Container();
world.addChild(tileGroup);
var docBody = document.getElementsByTagName("body")[0];
function changeCursor(input) {
    switch(input) {
        case 0:
            docBody.style.cursor = "initial";
            break;
        case 1: 
            docBody.style.cursor = "pointer";
            break;
    }
}

var input = new PIXI.InteractionManager(app.renderer);

texRend = new PIXI.Text('',{fontFamily : "mainFont", fontSize: 32, fill : 0xFFFFFF, align : 'center'});
texRend.x = 256;
texRend.y = 10;
world.addChild(texRend);

function debugText(text) {
    texRend.text = text;
}


app.loader
    .add("Resources/sprites/droneMK1.png")
    .add("Resources/sprites/droneMK2.png")
    .add("Resources/sprites/droneMK3.png")
    .add("Resources/sprites/spawnerMK1.png")
    .load(() => {
        for(var i = 0; i < 16; i++) {
            setTimeout(() => {
                var rand = 0;
                addEntity(rand);
                setTimeout(() => {
                    //delEntity(rand);
                }, Math.round(10000));
            }, Math.round(1000*Math.random()));
        }
        for(var i = 0; i < 6; i++) {
            setTimeout(() => {
                var rand = 1;
                addEntity(rand);
                setTimeout(() => {
                    //delEntity(rand);
                }, Math.round(10000));
            }, Math.round(1000*Math.random()));
        }
        for(var i = 0; i < 10; i++) {
            setTimeout(() => {
                var rand = 2;
                addEntity(rand);
                setTimeout(() => {
                    //delEntity(rand);
                }, Math.round(10000));
            }, Math.round(1000*Math.random()));
        }
        for(var i = 0; i < 3; i++) {
            setTimeout(() => {
                var rand = 5;
                addEntity(rand);
                setTimeout(() => {
                    //delEntity(rand);
                }, Math.round(10000));
            }, Math.round(1000*Math.random()));
        }
    })

function resizeWorld() {
    sizeMultiplier = window.innerWidth / stageWidth;
    sizeMultiplier /= 1.1;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    world.scale = {x: sizeMultiplier, y: sizeMultiplier};
    //cornerDot1.x = window.innerWidth + 10;
    //cornerDot1.y = window.innerHeight + 10;
}       
window.onresize = resizeWorld;
resizeWorld();