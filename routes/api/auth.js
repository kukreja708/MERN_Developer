const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route  GET api/auth
// @desc   Test route
// @access Authorized

router.get('/', auth, async(req, res) => {
    // Get user info
    try {
        const result = await User.findById(req.user.id).select('-password');
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route  POST api/auth
//@desc   Validate user and token
//@access Public

router.post('/', [
    check('email', 'Email is Required'),
    check('password', 'Password is')
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ "msg": "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ "msg": "Invalid Credentials" }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'), { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;