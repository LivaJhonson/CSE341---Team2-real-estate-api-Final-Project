import Agent from '../models/Agent.js';
import mongoose from 'mongoose';

// GET all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET agent by ID
export const getAgentById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid agent ID' });

  try {
    const agent = await Agent.findById(id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST create agent
export const createAgent = async (req, res) => {
  const { name, email, phone, licenseNumber } = req.body;

  if (!name || !email || !licenseNumber)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const agent = new Agent({ name, email, phone, licenseNumber });
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT update agent
export const updateAgent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid agent ID' });

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedAgent)
      return res.status(404).json({ message: 'Agent not found' });

    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE agent
export const deleteAgent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid agent ID' });

  try {
    const deletedAgent = await Agent.findByIdAndDelete(id);
    if (!deletedAgent)
      return res.status(404).json({ message: 'Agent not found' });

    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
