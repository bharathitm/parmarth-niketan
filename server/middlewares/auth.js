const GoogleStrategy = require('passport-google-oauth')
    .OAuth2Strategy;

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: '965244623378-kf10l3bm5vlmcq3367uqk27ttchce81m.apps.googleusercontent.com',
        clientSecret: '35Duw2-2K256EMbk09oN7HaP',
        callbackURL: '/login/pn/return'
    }, (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};
