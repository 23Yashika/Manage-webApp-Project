import User from '../models/User.js';

export const register = async (req, res) => {
  const { fullName, username } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ msg: 'Username taken!' });
    const user = await User.create({ fullName, username });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: 'No user found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
