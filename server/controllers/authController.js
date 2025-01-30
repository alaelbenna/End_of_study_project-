import admin from "firebase-admin"; // Default import for firebase-admin

const { auth } = admin; // Destructure auth from the default import

import User from "../models/User.js"; // Ensure the file extension is included for ES modules

export const syncUser = async (req, res) => {
  const { uid, email, firstName, lastName, gender } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    // Verify Firebase token
    const decodedToken = await auth().verifyIdToken(token);
    if (decodedToken.uid !== uid) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ uid });
    if (user) {
      return res.status(200).json({ message: "User already exists in the database.", user });
    }

    // Save new user to MongoDB
    user = new User({
      uid,
      email,
      firstName,
      lastName,
      gender,
      role: "user", // Default role
    }); 

    await user.save();
    res.status(201).json({ message: "User synced successfully.", user });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ message: "Failed to sync user." });
  }
};
