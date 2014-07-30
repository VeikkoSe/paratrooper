class Character extends Processor {
    update() {

        var foundMoveEntities = em.getAllEntitiesPosessingComponent("Movable");


        if (foundMoveEntities.length > 0) {

            for (var e = 0; e < foundMoveEntities.length; e++) {

                var se = em.searchComponentForEntity(foundMoveEntities[e], "Selectable");
                if (se) {

                    var re = em.searchComponentForEntity(foundMoveEntities[e], "Renderable");
                    if (re) {
                        var me = em.searchComponentForEntity(foundMoveEntities[e], "Movable");

                        if (me && se.selected) {


                            //me.newXpos = camera.clickPosition[0];
                            //me.newYpos = camera.clickPosition[1];
                            //me.newZpos = camera.clickPosition[2];

                            re.xPos = camera.clickPosition[0];
                            re.yPos = camera.clickPosition[1];
                            re.zPos = camera.clickPosition[2];

                        }
                    }
                }
            }
        }
    }
}