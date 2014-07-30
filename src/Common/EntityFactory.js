class EntityFactory {
    constructor() {

        this.controllable = new Controllable();

    }

    createMedic() {

        var e = em.addNew();
        e.addComponent(new Movable(0, 0, 0));
        e.addComponent(new Renderable(0, 0, 0));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("ship")));

    }

    createRanger() {

        var e = em.addNew();
        e.addComponent(new Movable(5, 0, 5));
        e.addComponent(new Renderable(5, 0, 5));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("ship")));

    }

    createGunner() {

        var e = em.addNew();
        e.addComponent(new Movable(10, 0, 5));
        e.addComponent(new Renderable(10, 0, 5));
        e.addComponent(new Selectable());
        e.addComponent(this.controllable);
        e.addComponent(new MeshComponent(new Mesh("ship")));

    }

    createBackground() {

        var e = em.addNew();
        e.addComponent(new Renderable(0, 0, 0));
        e.addComponent(new MeshComponent(new Mesh("background")));


    }

}