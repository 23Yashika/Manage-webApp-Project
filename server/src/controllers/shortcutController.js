import Shortcut from '../models/Shortcut.js';

export const addShortcut = async (req, res) => {
  const { name, url, userId } = req.body;
  try {
    const shortcut = await Shortcut.create({ name, url, userId });
    res.json(shortcut);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShortcuts = async (req, res) => {
  try {
    const { userId } = req.params;
    const shortcuts = await Shortcut.find({ userId });
    res.json(shortcuts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteShortcut = async (req, res) => {
  try {
    await Shortcut.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In shortcutController.js
export const editShortcut = async (req, res) => {
  try {
    const { name, url } = req.body;  // Add url here
    const updated = await Shortcut.findByIdAndUpdate(
      req.params.id,
      { name, url },  // Update both fields
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
