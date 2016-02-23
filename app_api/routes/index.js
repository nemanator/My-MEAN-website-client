var express = require('express');
var app = express();
var router = express.Router();

var ctrlAuthLocal = require('../controllers/auth-local');
var ctrlAuth3dParty = require('../controllers/auth-3dparty');
var ctrlProjects = require('../controllers/projects');
var ctrlContact = require('../controllers/contact');
var ctrlUser = require('../controllers/users');
//var ctrlAuthors = require('../controllers/authors');

//--------------------------------normal routes-----------------------------------
// projects
router.get('/projects', ctrlProjects.projectsList);
router.get('/projecthome', ctrlProjects.projectsListHomepage);
router.get('/projects/:projectid', ctrlProjects.projectsReadOne);

router.post('/email', ctrlContact.sendEmailWithRecaptcha);

//get user from db
router.get('/users/:id', ctrlUser.usersReadOneById)


//------------------------------authenticate (first login)---------------------------------
// local authentication
router.post('/register', ctrlAuthLocal.register);
router.post('/login', ctrlAuthLocal.login);

router.get('/decodeToken/:token', ctrlAuthLocal.decodeToken); //TODO move to a general place, and not into authlocal

// third party anthentication
router.get('/auth/github', ctrlAuth3dParty.authGithub);
router.get('/auth/github/callback', ctrlAuth3dParty.authGithubCallback, ctrlAuth3dParty.callbackRedirectGithub);

router.get('/auth/google', ctrlAuth3dParty.authGoogle);
router.get('/auth/google/callback', ctrlAuth3dParty.authGoogleCallback, ctrlAuth3dParty.callbackRedirectGoogle);

router.get('/auth/facebook', ctrlAuth3dParty.authFacebook);
router.get('/auth/facebook/callback', ctrlAuth3dParty.authFacebookCallback, ctrlAuth3dParty.callbackRedirectFacebook);

router.get('/auth/twitter', ctrlAuth3dParty.authTwitter);
router.get('/auth/twitter/callback', ctrlAuth3dParty.authTwitterCallback, ctrlAuth3dParty.callbackRedirectTwitter);

router.get('/auth/linkedin', ctrlAuth3dParty.authLinkedin);
router.get('/auth/linkedin/callback', ctrlAuth3dParty.authLinkedinCallback, ctrlAuth3dParty.callbackRedirectLinkedin);

//-------------------authorize (already logged in/connecting other social account)-------------------
// third party authorization
router.get('/connect/github', ctrlAuth3dParty.connectGithub);
router.get('/connect/github/callback', ctrlAuth3dParty.connectGithubCallback);

router.get('/connect/google', ctrlAuth3dParty.connectGoogle);
router.get('/connect/google/callback', ctrlAuth3dParty.connectGoogleCallback);

router.get('/connect/facebook', ctrlAuth3dParty.connectFacebook);
router.get('/connect/facebook/callback', ctrlAuth3dParty.connectFacebookCallback);

router.get('/connect/twitter', ctrlAuth3dParty.connectTwitter);
router.get('/connect/twitter/callback', ctrlAuth3dParty.connectTwitterCallback);

router.get('/connect/linkedin', ctrlAuth3dParty.connectLinkedin);
router.get('/connect/linkedin/callback', ctrlAuth3dParty.connectLinkedinCallback);


// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
// router.use(function(req, res, next) {

// 	// check header or url parameters or post parameters for token
// 	var token = req.body.token || req.query.token || req.headers['x-access-token'];
// 	console.log('[api-auth] Verifying authentication for this api\'s request');
// 	console.log(req);
// 	// decode token
// 	if (token) {
// 		console.log(token);
// 		console.log('[api-auth] Token found with: ' + process.env.JWT_SECRET);
// 		// verifies secret and checks exp
// 		jwt.verify(token, app.get(process.env.JWT_SECRET), function(err, decoded) {			
// 			if (err) {
// 				console.log('[api-auth] Error during verify process');
// 				return res.json({ success: false, message: 'Failed to authenticate token.' });		
// 			} else {
// 				// if everything is good, save to request for use in other routes
// 				console.log('[api-auth] OK');
// 				req.decoded = decoded;	
// 				next();
// 			}
// 		});

// 	} else {
// 		console.log('[api-auth] No token');
// 		// if there is no token
// 		// return an error
// 		return res.status(403).send({ 
// 			success: false, 
// 			message: 'No token provided.'
// 		});
		
// 	}
	
// });

//add the unlinks
router.get('/unlink/local', ctrlAuthLocal.unlinkLocal);
router.get('/unlink/facebook', ctrlAuth3dParty.unlinkFacebook);
router.get('/unlink/github', ctrlAuth3dParty.unlinkGithub);
router.get('/unlink/google', ctrlAuth3dParty.unlinkGoogle);
router.get('/unlink/twitter', ctrlAuth3dParty.unlinkTwitter);
router.get('/unlink/linkedin', ctrlAuth3dParty.unlinkLinkedin);

module.exports = router;