class Earthquake {
  constructor(data_x, data_y, data_mag){
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