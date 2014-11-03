class EntityFactory {
    constructor() {

        this.controllable = new Controllable();

    }

    createMedic() {

        var e = em.addNew();
        e.addComponent(new Movable(0, 1, 0));
        e.addComponent(new Renderable(0, 1, 0));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("ranger",5)));

    }

    createRanger() {

        var e = em.addNew();
        e.addComponent(new Movable(5, 1, 5));
        e.addComponent(new Renderable(5, 1, 5));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("gunner",5)));

    }



    createGunner() {


        var e = em.addNew();
        e.addComponent(new Movable(10, 1, 5));
        e.addComponent(new Renderable(10, 1, 5));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("medic",5)));

    }




    createTerrain() {

        var e = em.addNew();
        e.addComponent(new Renderable(0, 0, 0));
        e.addComponent(new MeshComponent(new Mesh("heightmap_1",5)));

/*
        var e = em.addNew();
        e.addComponent(new Renderable(256, 0, 0));
        e.addComponent(new MeshComponent(new Mesh("heightmap_2",5)));


        var e = em.addNew();
        e.addComponent(new Renderable(512, 0, 0));
        e.addComponent(new MeshComponent(new Mesh("heightmap_3",5)));

        var e = em.addNew();
        e.addComponent(new Renderable(0, 0, 256));
        e.addComponent(new MeshComponent(new Mesh("heightmap_4",5)));

        var e = em.addNew();
        e.addComponent(new Renderable(256, 0, 256));
        e.addComponent(new MeshComponent(new Mesh("heightmap_5",5)));

        var e = em.addNew();
        e.addComponent(new Renderable(512, 0, 256));
        e.addComponent(new MeshComponent(new Mesh("heightmap_6",5)));

        var e = em.addNew();
        e.addComponent(new Renderable(0, 0, 512));
        e.addComponent(new MeshComponent(new Mesh("heightmap_7",5)));

        var e = em.addNew();
        e.addComponent(new Renderable(256, 0, 512));
        e.addComponent(new MeshComponent(new Mesh("heightmap_8",5)));

        var e = em.addNew();
        e.addComponent(new Renderable(512, 0, 512));
        e.addComponent(new MeshComponent(new Mesh("heightmap_9",5)));
*/

    }

    createHouse() {


        var mesh = new Mesh("house");

        for (var i=0;i<1;i++)
        {
            //var randX = Math.floor((Math.random() * 50) + 1);
            //var randZ = Math.floor((Math.random() * 50) + 1);

            //randX *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
            //randZ *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases



            var e = em.addNew();

            e.addComponent(new Renderable(30, 0, 30));
            //e.addComponent(new Selectable());
            e.addComponent(this.controllable);
            e.addComponent(new MeshComponent(mesh,5));

        }

    }

}