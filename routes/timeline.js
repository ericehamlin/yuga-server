exports.query = function(db) {
    return function(req, res){
        var collection = db.get('timelines');
        collection.find({},
            function(e,docs){
                res.send(200, docs);
            }
        );
    };
};

exports.read = function(db) {
    return function(req, res){
        var collection = db.get('timelines');
        collection.findById(
            req.params.id,
            function(e, doc) {
                if (e) {
                    res.send(404);
                }
                else {
                    res.send(200, doc);
                }
            }
        )
    };
};

exports.create = function(db) {
    return function(req, res){
        var collection = db.get('timelines');
        collection.insert(req.body,
            function() {
                // SUCCESS
                res.send(201);
            },
            function() {
                // ERROR
            }
        );
    };
};

exports.update = function(db) {
    return function(req, res){

    };
};

exports.delete = function(db) {
    return function(req, res){

    };
};

