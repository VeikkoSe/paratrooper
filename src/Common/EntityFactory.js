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
        e.addComponent(new MeshComponent(new Mesh("ranger")));

    }

    createRanger() {

        var e = em.addNew();
        e.addComponent(new Movable(5, 1, 5));
        e.addComponent(new Renderable(5, 1, 5));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("gunner")));

    }



    createGunner() {

        var e = em.addNew();
        e.addComponent(new Movable(10, 1, 5));
        e.addComponent(new Renderable(10, 1, 5));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("medic")));

    }

    createBackground() {

        var e = em.addNew();
        e.addComponent(new Renderable(0, 0, 0));
        e.addComponent(new MeshComponent(new Mesh("background")));


    }

    createHouse() {


        var mesh = new Mesh("house");

        for (var i=0;i<3;i++)
        {
            var randX = Math.floor((Math.random() * 50) + 1);
            var randZ = Math.floor((Math.random() * 50) + 1);

            randX *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
            randZ *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases



            var e = em.addNew();

            e.addComponent(new Renderable(randX, 0, randZ));
            e.addComponent(new Selectable());
            e.addComponent(this.controllable);
            e.addComponent(new MeshComponent(mesh));
        }

    }

}