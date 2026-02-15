import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String
    },
    licenseNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Agent', agentSchema);
