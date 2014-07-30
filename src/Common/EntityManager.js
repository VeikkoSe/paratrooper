class EntityManager {
    constructor() {
        this.entities = [];
        this.maxId = 0;


    }

    addNew() {
        this.maxId++;
        var ent = new Entity(this.maxId);

        this.entities.push(ent);
        return ent;
    }

    getAllEntitiesPosessingComponent(name) {


        var entities = [];
        for (var e = 0; e < this.entities.length; e++) {

            for (var c = 0; c < this.entities[e].components.length; c++) {

                if (this.entities[e].components[c].name == name)
                    entities.push(this.entities[e]);
            }
        }
        return entities;
    }

    searchComponentForEntity(entity, component) {

        for (var c = 0; c < entity.components.length; c++) {

            if (entity.components[c].name == component) {

                return entity.components[c];
            }
        }
        return false;

    }
}