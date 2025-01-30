import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  user: {  // Reference to the User model
    type: String,
    required: true,
  },
  stadium: { // Reference to the Stadium model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stadium",
    required: true,
  },
  startTime: {  // Add startTime field
    type: Date,
  },
  endTime: {  // Add endTime field
    type: Date,
  },
});

export default mongoose.model("Reservation", reservationSchema);
