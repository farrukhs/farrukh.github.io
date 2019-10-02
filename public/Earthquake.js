class Earthquake {
  constructor(data_lon, data_lat, orig_mag, place, data_x, data_y, data_mag){
    this.lon = data_lon;
    this.lat = data_lat;
    this.orig_mag = orig_mag;
    this.place = place;
    this.x = data_x;
    this.y = data_y;
    this.mag = data_mag;
    this.enable = false;
  }
  
  show(){  
    if(this.enable){
      stroke(color(255,0,0));
      fill(255,0,0, 120);
      ellipse(this.x, this.y, this.mag);
    }
    
  }
  
  hide(){
    noStroke();
    fill(255,0,0, 255);
    ellipse(this.x, this.y, this.mag);
  }
}