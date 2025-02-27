const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const UserSchema = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhichisbuiltinreactappproject';

// Configuration de la session
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

router.use(passport.initialize());
router.use(passport.session());

// Configuration de la stratégie de Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
    const user = await UserSchema.findById(id);
    cb(null, user);
});

// Route 1: Enregistrement d'un nouvel utilisateur
router.post('/register', [
    body('email', "Please Enter a Valid Email").isEmail(),
    body('name', "Username should be at least 4 characters.").isLength({ min: 4 }),
    body('password', "Password Should Be At Least 8 Characters.").isLength({ min: 8 }),
    body('phone', "Phone Number Should Be 10 Digits.").isLength({ min: 10 }),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const existingUser = await UserSchema.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(403).json({ error: "A User with this email address already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = await UserSchema.create({
            email: req.body.email,
            name: req.body.name,
            password: hash,
            phone: req.body.phone,
            createdAt: Date(),
        });

        const payload = {
            user: {
                id: newUser.id,
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 2: Connexion d'un utilisateur
router.post('/login', [
    body('email', "Please Enter a Valid Email").isEmail(),
    body('password', "Password is required").exists(),
], (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!user) {
            return res.status(403).json({ error: "Invalid Credentials" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            const authtoken = jwt.sign(payload, JWT_SECRET);
            return res.status(200).json({ authtoken });
        });
    })(req, res, next);
});

// Route 3: Déconnexion
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});

// Route 4: Récupération des données utilisateur
router.get('/user', async (req, res) => {
    try {
        const email = req.headers.email; // Extraire l'email des en-têtes de la requête

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.json(userDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 5: Mise à jour des informations utilisateur
router.put('/user', [
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.headers.email; // Extraire l'email des en-têtes de la requête

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        const existingUser = await UserSchema.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.name = req.body.name;
        existingUser.phone = req.body.phone;
        existingUser.updatedAt = Date();

        const updatedUser = await existingUser.save();

        const payload = {
            user: {
                id: updatedUser.id,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
