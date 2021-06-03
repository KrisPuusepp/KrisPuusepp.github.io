//setup
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)
//Create a Pixi Application
stageWidth = innerWidth;
stageHeight = innerHeight;
let app = new PIXI.Application({width: stageWidth, height: stageHeight, antialias: true, backgroundColor: 0x1E1E1E});
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
//resize to window
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
tileSize = stageWidth/64/1.3;
tileGroup = new PIXI.Container();
app.stage.addChild(tileGroup);
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