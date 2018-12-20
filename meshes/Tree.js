class Tree {
    constructor(treeX, treeZ, treeHeight, treeTexModel, leafTexModel, entities) {

        for (var i = 1; i < treeHeight; i++)
            entities.add(new Entity(treeTexModel, new Vector3f(treeX, i, treeZ), 0, 0, 0, 1));

        var topSize = 3;
        for (var i = 0; i < topSize; i++) {
            for (var j = 0; j < topSize; j++)
                entities.add(new Entity(leafTexModel, new Vector3f(treeX - 1 + i, treeHeight, treeZ + j - 1), 0, 0, 0, 1));
        }
        var leavesHeight = treeHeight - 3;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                entities.add(new Entity(leafTexModel, new Vector3f(treeX - 2 + i, leavesHeight + j, treeZ - 2), 0, 0, 0, 1));
                entities.add(new Entity(leafTexModel, new Vector3f(treeX - 2 + i, leavesHeight + j, treeZ - 1), 0, 0, 0, 1));
                if (i !== 2)
                    entities.add(new Entity(leafTexModel, new Vector3f(treeX - 2 + i, leavesHeight + j, treeZ), 0, 0, 0, 1)); // middle
                entities.add(new Entity(leafTexModel, new Vector3f(treeX - 2 + i, leavesHeight + j, treeZ + 1), 0, 0, 0, 1));
                entities.add(new Entity(leafTexModel, new Vector3f(treeX - 2 + i, leavesHeight + j, treeZ + 2), 0, 0, 0, 1));
            }
        }
    }
}