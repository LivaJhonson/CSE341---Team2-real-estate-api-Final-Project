import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github2';

// Existing Route imports
import usersRoutes from './routes/users.js';
import propertiesRoutes from './routes/properties.js';
import agentsRoutes from './routes/agents.js';
import inquiriesRoutes from './routes/inquiries.js';
import swaggerRoutes from './swagger.js';

const app = express();

// 1. Session setup (Required for Passport to remember users)
app.use(session({
  secret: process.env.SESSION_SECRET || 'cse341_secret',
  resave: false,
  saveUninitialized: true
}));

// 2. Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());

// 3. GitHub Strategy Configuration
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // In a real app, you'd find or create a user in your DB here.
    // For this project, passing the profile is sufficient.
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// 4. Auth Routes (Required for the login process)
app.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    res.redirect('/'); // Redirect to home on success
  }
);

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// --- Your Existing Routes ---
app.use('/users', usersRoutes);
app.use('/properties', propertiesRoutes);
app.use('/agents', agentsRoutes);
app.use('/inquiries', inquiriesRoutes);
app.use('/api-docs', swaggerRoutes);

app.get('/', (req, res) => {
  res.send(req.isAuthenticated() 
    ? `Logged in as ${req.user.displayName}` 
    : 'Real Estate Listing API is running. <a href="/login">Login with GitHub</a>');
});

export default app;