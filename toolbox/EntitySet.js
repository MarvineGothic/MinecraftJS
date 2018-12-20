var EntitySet = function () {
    var set = [];

    this.size = function () {
        return set.length;
    };

    this.add = function (val) {
        var idx = this.has(val);
        if (idx !== false)
            set[idx] = val;
        else
            set.push(val);
    };

    this.get = function (i) {
        return set[i];
    };

    this.has = function (val) {
        for (var i = 0; i < set.length; i++) {
            if (set[i].equals(val))
                return i;
        }
        return false;
    };

    this.getSet = function () {
        return set;
    };

    this.remove = function (i) {
        set.splice(i, 1);
    };

    this.removeItem = function (vector) {
        var item = this.has(new Entity(null, vector, 0, 0, 0, 1));
        if (item !== false) this.remove(item);
    }
};