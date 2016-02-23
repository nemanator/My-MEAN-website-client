var mongoose = require('mongoose');
var ProjMongoose = mongoose.model('Project');

var Utils = require('../utils/util.js');
var utils = new Utils();

// var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// var gfs = new Grid(mongoose.connection.db);

/* GET list of projects */
module.exports.projectsList = function(req, res) {
  console.log('projectsList');
  ProjMongoose.find({}, function(err, results) {
    if (err) {
      console.log('projectsList error:', err);
      utils.sendJSONresponse(res, 404, err);
    } else {
      utils.sendJSONresponse(res, 200, results);
    }
  });
};


/* GET list of projects that contains carouselImagePath for Homepage */
module.exports.projectsListHomepage = function(req, res) {
  console.log('projectsListHomepage');
  ProjMongoose
    .find({"projectHomeView.carouselImagePath": { $exists: true } })
    .lean().exec(function(err, results) {
      if (err) {
        console.log('projectsListHomepage error:', err);
        utils.sendJSONresponse(res, 404, err);
      } else {
        utils.sendJSONresponse(res, 200, results);
      }
    });
};

/* GET a project by the id */
module.exports.projectsReadOne = function(req, res) {
  console.log('Finding a Project', req.params);
  if (req.params && req.params.projectid) {
    ProjMongoose
    .findById(req.params.projectid)
    .exec(function(err, project) {
      if (!project) {
        utils.sendJSONresponse(res, 404, {
          "message": "projectid not found"
        });
        return;
      } else if (err) {
        console.log(err);
        utils.sendJSONresponse(res, 404, err);
        return;
      }
      console.log(project);
      utils.sendJSONresponse(res, 200, project);
    });
  } else {
    console.log('No projectid specified');
    utils.sendJSONresponse(res, 404, {
      "message": "No projectid in request"
    });
  }
};