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
                            if(me.newXpos>0 && me.newZpos>0)
                            {

                            var start = {x:re.xPos,y:re.zPos};
                            var end = {x:me.newXpos,y:me.newZpos};

                            me.path = astarManager.move(start,end);
                            me.pathPosition = 0;
                            }
                        }



                        //if(!this.isClose(re.xPos, me.newXpos) || !this.isClose(re.zPos, me.newZpos))
                        if(me && me.path && me.pathPosition!=me.path.length)
                        {

                            var pos = me.pathPosition++;
                            me.newXpos = me.path[pos].x;
                            me.newZpos = me.path[pos].y;
                            re.xPos = me.newXpos;
                            re.zPos = me.newZpos;
                            re.yPos = 1;
                            //Create a vector in the direction
                            /*
                            var dirX = me.newXpos -re.xPos ;
                            var dirZ = me.newZpos- re.zPos ;

                            //Normalize this vector. That means divide the terms by the magnitude (the hypotenuse) of the vector.
                            var hyp = Math.sqrt(dirX*dirX + dirZ*dirZ);
                            console.log(hyp);
                            console.log = function() {}
                            dirX /= hyp;
                            dirZ /= hyp;

                            //Add that vector to the enemy's position, multiplied by the speed you want the enemy to move:
                            re.xPos += dirX*speed;
                            re.zPos += dirZ*speed;
                            re.yPos =1;
                            */
                        }



                    }
                }
            }

        }
    }

    checkCollision()
    {

    }
}