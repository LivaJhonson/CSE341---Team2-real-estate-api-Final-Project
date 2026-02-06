import Property from '../models/Property.js';
import mongoose from 'mongoose';

// GET all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agentId', 'name email');
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET property by ID
export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid property ID' });

  try {
    const property = await Property.findById(id).populate(
      'agentId',
      'name email'
    );
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create property
export const createProperty = async (req, res) => {
  const { title, description, price, location, agentId } = req.body;

  if (!title || !price || !location || !agentId)
    return res
      .status(400)
      .json({ message: 'Title, price, location, and agentId are required' });

  try {
    const property = new Property({ title, description, price, location, agentId });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update property
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, agentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid property ID' });

  try {
    const property = await Property.findByIdAndUpdate(
      id,
      { title, description, price, location, agentId },
      { new: true, runValidators: true }
    );

    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid property ID' });

  try {
    const property = await Property.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
