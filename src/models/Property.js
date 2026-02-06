import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
