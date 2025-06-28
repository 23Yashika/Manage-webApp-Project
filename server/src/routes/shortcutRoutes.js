import express from 'express';
import {
  addShortcut,
  getShortcuts,
  deleteShortcut,
  editShortcut
} from '../controllers/shortcutController.js';

const router = express.Router();
router.post('/add', addShortcut);
router.get('/:userId', getShortcuts);
router.delete('/:id', deleteShortcut);
router.put('/:id', editShortcut);
export default router;
