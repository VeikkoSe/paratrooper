class Movable extends Component
{
  constructor(newXpos=0,newYpos=0,newZpos=0) {

      this.name = "Movable";

      this.newXpos = newXpos;
      this.newYpos = newYpos;
      this.newZpos = newZpos;
      this.path = {};

      this.angle = 90;
      this.lt = 0;
      this.speed = 0;
      this.acceleration = 5;
  }

}