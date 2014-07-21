class Character {
    constructor() {


    }

    rotateLeft(elapsed) {
        if (this.angle >= 360)
            this.angle = 0;

        if (this.angle < 0)
            this.angle = 360;

        this.angle += 600 * ( elapsed / 1000.0 );
    }

    rotateRight(elapsed) {

        if (this.angle >= 360)
            this.angle = 0;

        if (this.angle < 0)
            this.angle = 360;
        this.angle -= 600 * ( elapsed / 1000.0 );

    }

    setAccelerationOn(elapsed) {


        //this.newEngineSmoke();

    }


    move(elapsed) {

        var deltaY = this.newYpos - this.yPos;
        var deltaX = this.newXpos - this.xPos;


        var angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;


        var dirVectorX = Math.cos(helpers.degToRad(angleInDegrees));
        var dirVectorY = Math.sin(helpers.degToRad(angleInDegrees));

        this.velocityX = dirVectorX * ( elapsed / 1000.0 );
        this.velocityY = dirVectorY * ( elapsed / 1000.0 );


        this.xPos += this.velocityX;
        this.yPos += this.velocityY;

    }



    checkHit() {

        /*
         for (var j = 0; j < game.stateEngine.gameState.asteroids.asteroids.length; j++) {

         if (game.stateEngine.gameState.asteroids.asteroids[j].visible == 1 &&
         this.xPos > game.stateEngine.gameState.asteroids.asteroids[j].xPos - 4 &&
         this.xPos < game.stateEngine.gameState.asteroids.asteroids[j].xPos + 4 &&
         this.yPos > game.stateEngine.gameState.asteroids.asteroids[j].yPos - 4 &&
         this.yPos < game.stateEngine.gameState.asteroids.asteroids[j].yPos + 4
         ) {
         this.ships--;

         }
         }

         if (this.ships < 1) {

         game.stateEngine.changeState("endstate");
         }
         */

    }


}
/**
 * Created by Vge on 13.7.2014.
 */
