exports.query = function(db) {
    return function(req, res){
        var collection = db.get('timelines');
        collection.find({},
            function(e,docs){
                if (e) {
                    res.send(404);
                }
                else {
                    res.send(200, docs);
                }
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
    return function(req, res) {
        var collection = db.get('timelines');
        collection.insert(req.body,
            function(e, doc) {
                if (e) {
                    // ERROR
                }
                else {
                    // SUCCESS
                    res.send(201, {"id":doc._id});
                }
            }
        );
    };
};

exports.update = function(db) {
    return function(req, res) {
        var collection = db.get('timelines');
        collection.findById(req.params.id).
            on("success", function(doc) {
                if (!doc) {
                    res.send(404);
                }
                else {
                    collection.updateById(req.params.id, req.body).
                        on("success", function() {
                            res.send(201);
                        });
                }
            }).
            on("error", function(e) {
                res.send(500);
            });
    };
};

exports.delete = function(db) {
    return function(req, res) {

    };
};

