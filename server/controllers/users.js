import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' });
    res.status(201).json({ result: newUser, token });
} catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
}
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'User doesn\'t exist' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
    res.status(200).json({ result: existingUser, token });
} catch (error) {
res.status(500).json({ message: 'Something went wrong' });
}
};
