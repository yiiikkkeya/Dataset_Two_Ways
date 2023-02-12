//data : https://datahub.io/core/sea-level-rise#readme 

let table;
let numRows;
let numCols;
let date = [];
let gsml=[];
let diagramX;
let diagramY;

function preload(){
  table = loadTable("assets/sealevel.csv","csv","header");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER)
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  

  for(let r =0; r<table.getRowCount(); r++){
    date[r] = table.getString(r,0);
    gsml[r] = table.getNum(r,1);
  }
  minMax();
  
}

let size = [];
function draw() {
  background(171, 217, 224);
  chartStyle();
  diagramX = width/2
  diagramY = height/2 + 100;
  let radius = width/5-100;
  let ang = 360 / numRows;
  
  for(let i =0; i<numRows; i++){
    size[i] = map(gsml[i],-3.5,79.5,0,205);
    let pointx = (size[i]+radius)*cos(radians(ang*i))+diagramX;
    let pointy = (size[i]+radius)*sin(radians(ang*i))+diagramY;
    let cirx = radius* cos(radians(ang*i))+diagramX;
    let ciry = radius* sin(radians(ang*i))+diagramY;
    
    if(i % 12 ===0){
      strokeWeight(1);
      stroke('blue')
    }else{
      strokeWeight(1);
      stroke(255)
    }
    line(cirx,ciry,pointx,pointy)
  
    fill('blue')
    noStroke();
    circle(pointx,pointy,3);
    
  }
}

function chartStyle(){
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Global Average Sea Level Change", width/2, height/4 -200, width/4);
  fill(255);
  textSize(20);
  text("1880 - 2014", width/2, height/4 - 130, width/4);
}

let dataMin, dataMax=0;

function minMax(){
  for(let i=0;i<numRows;i++){
    if(table.getNum(i,1)>dataMax){
      dataMax = table.getNum(i,1);
    }
  }
  dataMin = dataMax;
  for(let i=0; i<numRows; i++){
    if(table.getNum(i,1)<dataMin){
      dataMin = table.getNum(i,1);
    }
  }
}