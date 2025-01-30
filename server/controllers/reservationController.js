import Reservation from '../models/Reservation.js';
import User from '../models/User.js';  // Assuming you have a User model for authorization
import admin from 'firebase-admin';
import Stadium from '../models/Stadium.js';
import moment from 'moment';
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or specify your service account key here
  });
}

export const createReservation = async (req, res) => {
    const { stadiumId, name, email, phone, date, timeSlot } = req.body;
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.email; // Get the email from the decoded token
    if (!stadiumId || !name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const stadium = await Stadium.findById(stadiumId);
    if (!stadium) {
      return res.status(404).json({ message: "Stadium not found" });
    }
    const formattedDate = moment(date, ["YYYY-MM-DD", "ddd MMM DD YYYY"]).format("YYYY-MM-DD");
    if (!moment(formattedDate, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).json({ message: "Invalid date format. Expected YYYY-MM-DD." });
    }
    const timeSlotRegex = /^([01]?\d|2[0-3]):([0-5]\d)\s*-\s*([01]?\d|2[0-3]):([0-5]\d)$/;
    if (!timeSlotRegex.test(timeSlot)) {
      return res.status(400).json({ message: "Invalid time slot format. Expected 'HH:mm - HH:mm'." });
    }
    const [startTimeStr, endTimeStr] = timeSlot.split("-").map((t) => t.trim());
    const startTime = new Date(`${formattedDate}T${startTimeStr}:00.000Z`);
    const endTime = new Date(`${formattedDate}T${endTimeStr}:00.000Z`);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return res.status(400).json({ message: "Invalid time format. Could not parse start or end time." });
    }
    // Check if the requested time slot is available
    const isSlotTaken = await Reservation.findOne({
      stadium: stadiumId,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
      ],
    });
    if (isSlotTaken) {
      return res.status(400).json({ message: "This time slot is already taken", available: false });
    }
    const newReservation = new Reservation({
      stadium: stadiumId,
      name,
      email,
      phone,
      date,
      timeSlot,
      user: userId,
      startTime,
      endTime,
    });
    await newReservation.save();
    res.status(201).json({ message: "Reservation created successfully",
       reservation: newReservation, available: true });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reservations
export const getReservations = async (req, res) => {
  
  try {
    // Fetch all reservations and populate user and stadium details
    const reservations = await Reservation.find()
      .populate('user', 'name email')  // Populate user details (name and email)
      .populate('stadium', 'name location')  // Populate stadium details (name and location)
      .select('-__v');  // Optionally exclude the `__v` field

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found' });
    }

    res.status(200).json({ message: 'Reservations fetched successfully', reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching reservations' });
  }
};

// Get reservation by email
export const getUserReservations = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken, "tttttttttttttttt");
    const userId = decodedToken.email; // Get the email from the decoded token
    const reservations = await Reservation.find({ user: userId })
      .populate('stadium', 'name location')  // Populate stadium details (name and location)
      .select('-__v');  // Optionally exclude the `__v` field

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    res.status(200).json({ message: 'User reservations fetched successfully', reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

// Delete reservation by ID
export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;  // Assuming user ID is available from authentication middleware

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    // Todo: when you create a new reservation, make sure to have userId in the schema of reservations and when user creates new reservation add it to the schema aka user.uid
    // if (reservation.userId.toString() !== userId.toString()) {
    //   return res.status(403).json({ message: 'Unauthorized to delete this reservation' });
    // }

    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting reservation' });
  }
};
