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
            //url = url.replace("watch?v=", "v/");
            url = url.replace("https://www.youtube.com/watch?v=", "");
            
            video.URL = url;
            
            res.view({
                video: video
            });
        });
    },

    // Get an array of all videos in the video collection(e.g. list)    
    index: function(req, res, next) {
        Video.find(function foundVideos(err, videos) {
            if (err) return next(err);
            // pass the array down to the /views/index.ejs page
            res.view({
                videos: videos
            });
        });
    },
    
    // render the edit view (e.g. /views/edit.ejs)
    edit: function(req, res, next) {
        // Find the video from the id passed in via params
        Video.findOne(req.param('id'), function foundVideo(err, video) {
            if (err) return next(err);
            if (!video) return next('Video doesn\'t exist.');

            res.view({
                video: video
            });
        });
    },
    
    // process the info from edit view
  update: function(req, res, next) {
    Video.update(req.param('id'), req.params.all(), function videoUpdated(err) {
        if (err) {
            return res.redirect('/video/edit/' + req.param('id'));
        }

        res.redirect('/video/show/' + req.param('id'));
        });
    },
    
    destroy: function(req, res, next) {

        Video.findOne(req.param('id'), function foundVideo(err, video) {
        if (err) return next(err);

        if (!video) return next('Video doesn\'t exist.');

        Video.destroy(req.param('id'), function videoDestroyed(err) {
            if (err) return next(err);

        });        

        res.redirect('/video');

        });
  }
};

