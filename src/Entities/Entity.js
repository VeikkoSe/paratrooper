class Entity {
    constructor(id) {
      this.id = id;
      this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
    }

}