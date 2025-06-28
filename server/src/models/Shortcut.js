import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ShortcutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const Shortcut = model('Shortcut', ShortcutSchema);
export default Shortcut;
