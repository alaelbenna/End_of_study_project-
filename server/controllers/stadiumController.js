// reservationController.js
import Stadium from '../models/Stadium.js';


export const createStadium = async (req, res) => {
  try {
    const { name, location, availableSlots, capacity, image } = req.body;
    const newStadium = new Stadium({ name, location, availableSlots, capacity, image });
    await newStadium.save();
    res.status(201).json({ message: 'Stadium created successfully', stadium: newStadium });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stadiums
export const getStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.status(200).json( stadiums );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a stadium
export const updateStadium = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStadium = await Stadium.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStadium) return res.status(404).json({ error: 'Stadium not found' });
    res.status(200).json({ message: 'Stadium updated successfully', stadium: updatedStadium });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a stadium
export const deleteStadium = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStadium = await Stadium.findByIdAndDelete(id);
    if (!deletedStadium) return res.status(404).json({ error: 'Stadium not found' });
    res.status(200).json({ message: 'Stadium deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
