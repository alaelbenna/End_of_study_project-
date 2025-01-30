import mongoose from 'mongoose';

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availableSlots: [
    {
      startTime: {
        type: Date, // Represents the starting time of the slot
        required: true,
      },
      endTime: {
        type: Date, // Represents the ending time of the slot
        required: true,
      },
    },
  ],
  capacity: {
    type: Number, // Capacity for the stadium
    required: true,
  },
  image: {
    type: String, // A URL to the stadium's image
    required: false, // If you don't want to make it mandatory
  },
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

export default Stadium;
