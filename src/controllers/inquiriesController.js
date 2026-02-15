import Inquiry from '../models/Inquiry.js';
import mongoose from 'mongoose';

// GET all inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('propertyId')
      .populate('userId');
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET inquiry by ID
export const getInquiryById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid inquiry ID' });

  try {
    const inquiry = await Inquiry.findById(id)
      .populate('propertyId')
      .populate('userId');

    if (!inquiry)
      return res.status(404).json({ message: 'Inquiry not found' });

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create inquiry
export const createInquiry = async (req, res) => {
  const { propertyId, userId, message } = req.body;

  if (!propertyId || !userId || !message)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const inquiry = new Inquiry({ propertyId, userId, message });
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update inquiry
export const updateInquiry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid inquiry ID' });

  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedInquiry)
      return res.status(404).json({ message: 'Inquiry not found' });

    res.status(200).json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE inquiry
export const deleteInquiry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid inquiry ID' });

  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    if (!deletedInquiry)
      return res.status(404).json({ message: 'Inquiry not found' });

    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
