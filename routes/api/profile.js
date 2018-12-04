const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Test post profile
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Profile Works"
}));

// @route   GET api/profile/
// @desc    Get current user's profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/
// @desc    Create or edit current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), 
(req, res) => {
    // Get fields
    const profileFields = {}; 
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.company = req.body.company;
    if(req.body.handle) profileFields.website = req.body.website;
    if(req.body.handle) profileFields.location = req.body.location;
    if(req.body.handle) profileFields.bio = req.body.bio;
    if(req.body.handle) profileFields.status = req.body.status;
    if(req.body.handle) profileFields.githubusername = req.body.githubusername;
    // Skills - split into an array
    if(typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.handle.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if(profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json.profile);
        });
      }
      });
      }
  );

module.exports = router; 