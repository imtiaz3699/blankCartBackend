import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {handleError} from '../utils/helpers.js'
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name) {
    return handleError(res,"Name is required.",400);
  }
  if(!email || !password) {
    return handleError(res,"Email and password are required",400);  
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return handleError(res,"User Already exists",400);

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return handleError(res,"Email and password are required",400);
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return handleError(res,"Invalid credentials",401);
    }
    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
