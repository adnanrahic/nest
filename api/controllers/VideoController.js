/* global Video */
/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req, res) {
        res.view();
    },
    
    create: function (req, res, next) {
        Video.create(req.params.all(), function videoCreated(err, video) {
            if (err) return next(err);
            res.json(video);
        });
    }
};

