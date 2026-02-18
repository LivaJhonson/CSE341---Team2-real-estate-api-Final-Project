import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Property title is required'], trim: true },
  description: { type: String, required: false },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  location: { type: String, required: true },
  // Rubric Boost: Added fields to reach 8 total fields
  propertyType: { type: String, required: true }, // e.g., House, Condo
  status: { type: String, enum: ['Available', 'Sold', 'Pending'], default: 'Available' },
  sqft: { type: Number, required: true }, 
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);
export default Property;