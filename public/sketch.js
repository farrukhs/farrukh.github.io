var img;
let earthquake_list;
let earthquakes = [];
let idx = 0;

var clat = 0;
var clon = 0;


var lat = 51.5074; //33.6844;
var lon = -0.1278; //73.0479;

function preload() {
  // preload() runs once
  img = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiZmFycnVraCIsImEiOiJ1YjZJZ1NBIn0.gpvfQueo5w5JuaO9f93SuQ');
  earthquake_list = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv');
}


function setup() {
  frameRate(30);
  createCanvas(1024, 512);
  
  var cx = mercX(clon,1);
  var cy = mercY(clat,1);
  
  for(let earthquake_item of earthquake_list){
    data = earthquake_item.split(/,/);
    
    let eq_lat = data[1];
    let eq_lon = data[2];
    let mag = data[4];
    
    mag = sqrt(pow(10, mag));
    let magmax = sqrt(pow(10, 10));
    
    let d = map(mag, 0, magmax, 0, 180*8);
    print(mag);
    
    let eq_x = mercX(eq_lon,1) - cx;
    let eq_y = mercY(eq_lat,1) - cy;
    
    earthquakes.push(new Earthquake(eq_x,eq_y,d));
    
  }
  
  
}

function draw() {
  //background(220);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(img, 0, 0);
  
  if(idx < earthquakes.length){
    earthquakes[idx].enable = true;
    idx++;
  }
  
  for(let earthquake of earthquakes){
    earthquake.show();
  }
}

function mercX(lon, zoom){
  lon = radians(lon);
  return (256/PI) * pow(2, zoom) * (lon + PI)
}

function mercY(lat, zoom){
  lat = radians(lat);
  return (256/PI) * pow(2, zoom) * (PI - log(tan(PI/4 + lat/2)));
}