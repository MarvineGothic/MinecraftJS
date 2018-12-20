class House {
    constructor(texPack, entities) {

        for (var y = 1; y < 6; y++) {
            // front
            for (var x = 0; x < 5; x++)
                entities.add(new Entity(texPack[0], new Vector3f(x, y, 0), 0, 0, 0, 1))

            // back
            for (var x = 0; x < 5; x++)
                entities.add(new Entity(texPack[0], new Vector3f(x, y, 5), 0, 0, 0, 1))

            // left
            for (var z = 0; z < 5; z++)
                entities.add(new Entity(texPack[0], new Vector3f(0, y, z), 0, 0, 0, 1))

            //right
            for (var z = 0; z < 5; z++)
                entities.add(new Entity(texPack[0], new Vector3f(4, y, z), 0, 0, 0, 1))
        }


        // roof
        for (var z = 0; z < 5; z++) {
            for (var x = 0; x < 5; x++)
                entities.add(new Entity(texPack[0], new Vector3f(x, 5, z), 0, 0, 0, 1));

            // floor
            for (var x = 0; x < 5; x++)
                entities.add(new Entity(texPack[0], new Vector3f(x, 1, z), 0, 0, 0, 1))
        }

        // door
        for (var x = 2; x < 3; x++)
            for (var y = 2; y < 4; y++)
                entities.removeItem(new Vector3f(x, y, 0));

        for (var z = 2; z < 4; z++){
            entities.add(new Entity(texPack[1], new Vector3f(0, 3, z), 0, 0, 0, 1));
            entities.add(new Entity(texPack[1], new Vector3f(4, 3, z), 0, 0, 0, 1))
        }

        entities.add(new Entity(texPack[1], new Vector3f(2, 3, 5), 0, 0, 0, 1));

    }
}