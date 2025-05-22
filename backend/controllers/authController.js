const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if user exist
        const userExists = await User.findOne({ email });
        if (userExists) { return res.status(400).json({ message: 'User Already Exists' }); }

        //create new user
        const user = await User.create({ name, email, password });

        //return token
        const token = generateToken(user._id);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user exists
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ message: 'Invalid user' }); }

        //compare passwords with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(400).json({ message: 'Invalid user' }); }

        //jwt , but whats its purpose
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
}

