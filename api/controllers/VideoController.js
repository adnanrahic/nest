/* global Video */
/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req, res) {
        res.locals.flash = _.clone(req.session.flash);
        req.session.flash = {};
        res.view();
    },
    
    create: function (req, res, next) {
        Video.create(req.params.all(), function videoCreated(err, video) {
            //if theres an error, log it and redirect to same page
            if (err) {
                console.log(err);
                req.session.flash ={
                    err: err.ValidationError
                }
                
                //redirect to same page
                return res.redirect('/video/new');
            }
            
            //successful creation
            req.session.flash = {};
            //res.json(video); //return json
            
            //success -> redirect to show video page
            res.redirect('/video/show/'+video.id);
        });
    },
    
    //render the play video view    
    show: function(req, res, next) {
        Video.findOne(req.param('id'), function foundVideo(err, video) {         
            if (err) return next(err);
            if (!video) return next();
            
            var url = video.URL; 
            url = url.replace("watch?v=", "v/");
            
            video.URL = url;
            
            res.view({
                video: video
            });
        });
    }
};

