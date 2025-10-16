import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Hash password before saving
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save user to DB
    await newUser.save();

    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Compare password hashes
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials'));
    }

    // Create JWT token with user id as payload
    const token = jwt.sign(
      { id: validUser._id }, process.env.JWT_SECRET);

    // Destructure user object excluding password
    const { password: pass, ...rest } = validUser._doc;

    // Send JWT as HTTP-only cookie and user info as JSON
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // set true in prod for HTTPS
        sameSite: 'strict',
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
