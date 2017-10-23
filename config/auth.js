// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1939444202944550', // your App ID
        'clientSecret'  : '25c4572c0901078be622aeea6d809e2d', // your App Secret
        'callbackURL'   : 'http://127.0.0.1:8080/auth/facebook/callback',
        'profileFeilds' : ['emails']
      //  'profileURL'    : 'http://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    },
    'twitterAuth' : {
              'consumerKey'       : 'iJheCxf6J2W2SX1ZUnnBu7HID',
              'consumerSecret'    : 'T6QrG2gQxIFUC1mPV17cnyWF1C4UxqHC7wIsahJgGeOnVCvRNx',
              'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
          },
    'googleAuth' : {
        'clientID'      : '892952557377-3sgjqdm5mlaakaj2okt89sp20fn18si2.apps.googleusercontent.com',
        'clientSecret'  : 'D8nr5wvVUm07_mvDWgD93CSp',
        'callbackURL'   : 'http://127.0.0.1:8080/auth/google/callback'
    }

};
