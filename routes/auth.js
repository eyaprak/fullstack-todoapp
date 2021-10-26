const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//LOGIN ROUTER
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send('Wrong credentials. Please try again!');
    }
    const matched = await bcrypt.compare(req.body.password, user.password);
    if (!matched)
      return res.status(404).send('Wrong credentials. Please try again!');

    const { password, ...info } = user._doc;
    const token = await jwt.sign({ user }, process.env.JWT_SECRET);

    res.status(200).json({ ...info, token });
  } catch (err) {
    console.log(err);
    res.status(500).json('Server error');
  }
});

//REGISTER ROUTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password: bodyPassword } = req.body;
    const user = await User.find({ email });
    if (user.length > 0) {
      return res
        .status(400)
        .json('This user registered before. Try another one.');
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(bodyPassword, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await jwt.sign(
      { user: newUser._doc },
      process.env.JWT_SECRET
    );
    res.status(201).json({ ...newUser._doc, token });
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
