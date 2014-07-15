class Medic extends Character {
    constructor() {


        this.lastTime = 0;
        this.lt = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.newYpos = 0;
        this.newXpos = 0;
        this.angle = 90;
        this.lt = 0;
        this.speed = 0;
        this.acceleration =5;


        this.model = new Model('ship');

        this.visible = 1;

        this.velocityX = 0;
        this.velocityY = 0;

        this.acceleration = 10;
        this.lifes = 5;


    }

}