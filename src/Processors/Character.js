class Character extends Processor {

    isClose(currentCoord,newCoord)
    {
        if(currentCoord < newCoord+0.2 && currentCoord > newCoord-0.2)
            return true;

        return false;
    }

    update(deltatime) {

        var speed = 0.2;
        var foundMoveEntities = em.getAllEntitiesPosessingComponent("Movable");


        if (foundMoveEntities.length > 0) {

            for (var e = 0; e < foundMoveEntities.length; e++) {

                var se = em.searchComponentForEntity(foundMoveEntities[e], "Selectable");
                if (se) {

                    var re = em.searchComponentForEntity(foundMoveEntities[e], "Renderable");
                    if (re) {
                        var me = em.searchComponentForEntity(foundMoveEntities[e], "Movable");

                        if (me && se.selected && camera.clickPosition ) {


                            me.newXpos = camera.clickPosition[0];
                            me.newYpos = camera.clickPosition[1];
                            me.newZpos = camera.clickPosition[2];



                        }



                        if(!this.isClose(re.xPos, me.newXpos) || !this.isClose(re.zPos, me.newZpos))
                        {

                            //Create a vector in the direction that you want the enemy to move. That's easy:

                            var dirX = me.newXpos -re.xPos ;
                            var dirZ = me.newZpos- re.zPos ;

                            //Now normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.

                            var hyp = Math.sqrt(dirX*dirX + dirZ*dirZ);
                            console.log(hyp);
                            console.log = function() {}
                            dirX /= hyp;
                            dirZ /= hyp;

                            //Now you just need to add that vector to the enemy's position, multiplied by the speed you want the enemy to move:

                            re.xPos += dirX*speed;
                            re.zPos += dirZ*speed;
                            re.yPos =1;

                        }


                    }
                }
            }

        }
    }
}