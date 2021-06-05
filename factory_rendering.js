//setup
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)
//Create a Pixi Application
stageWidth = 1536;
stageHeight = 753;
console.log("Detected Width: " + innerWidth + ", Detected Height: " + innerHeight);
let app = new PIXI.Application({width: stageWidth, height: stageHeight, antialias: true, backgroundColor: 0x1E1E1E});
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
//resize to window
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
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

tex = new PIXI.Text('',{fontFamily : 'Arial', fontSize: 32, fill : 0xFFFFFF, align : 'center'});
tex.x = 10;
tex.y = 10;
app.stage.addChild(tex);

function debugText(text) {
    tex.text = text;
}