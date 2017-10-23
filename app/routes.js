var User            = require('../app/models/user');

module.exports = function(app, passport) {



  app.get('/', function(req, res) {
         res.render('index.ejs');
     });

     app.get('/donate', function(req, res) {
         res.render('payme.ejs');
     });
     app.get('/nallurd', function(req, res) {
         res.render('nallur.ejs');
     });
     app.get('/contact', function(req, res) {
         res.render('contact.ejs');
     });
     // PROFILE SECTION =========================
     app.get('/profile', isLoggedIn, function(req, res) {
         res.render('profile.ejs', {
             user : req.user
         });
     });
     //add serial
     app.get('/add', function(req, res) {
   		res.render('Add.ejs'); // load the index.ejs file
   	});

     app.get('/details', function(req, res) {
       res.render('st1.ejs'); // load the index.ejs file
     });


     // LOGOUT ==============================
     app.get('/logout', function(req, res) {
         req.logout();
         res.redirect('/');
     });

   app.get('/home', function(req, res) {
             res.render('index2.ejs', { message: req.flash('loginMessage') });
         });

app.post("/donate", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Thank you, your request has been subbmitted. We'll contact you soon");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

// app.get("/getWorkers", (req, res) => {
//   var myData = User.find()
//
// .then(item => {
//     res.send(myData);
// })
// .catch(err => {
//     res.status(400).send("Unable to get");
// });
//  });





// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================


    app.get('/profile', function(req, res) {

      User.findOne(function(err,user){
        if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
              console.log("THIS : " + user.country);
              res.render('profile.ejs', {
              user: user
            });
      }




      // .then(item => {
      //
      //
      //   });
      // })
      // .catch(err => {
      //     res.status(400).send("Unable to get");
      // });
    });

  });


    //add serial
    app.get('/add', function(req, res) {
  		res.render('Add.ejs'); // load the index.ejs file
  	});


    //add eetails
    app.get('/detail', function(req, res) {
  		res.render('details.ejs'); // load the index.ejs file
  	});


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        app.get('/home', function(req, res) {
            res.render('index2.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        // app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
        //
        // // handle the callback after twitter has authenticated the user
        // app.get('/auth/twitter/callback',
        //     passport.authenticate('twitter', {
        //         successRedirect : '/profile',
        //         failureRedirect : '/'
        //     }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // // send to twitter to do the authentication
        // app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
        //
        // // handle the callback after twitter has authorized the user
        // app.get('/connect/twitter/callback',
        //     passport.authorize('twitter', {
        //         successRedirect : '/profile',
        //         failureRedirect : '/'
        //     }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // // twitter --------------------------------
    // app.get('/unlink/twitter', isLoggedIn, function(req, res) {
    //     var user           = req.user;
    //     user.twitter.token = undefined;
    //     user.save(function(err) {
    //         res.redirect('/profile');
    //     });
    // });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
