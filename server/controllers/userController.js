import User from '../models/User.js';

export const createOrUpdateUser = async (req, res) => {
    const { uid, email, displayName, photoURL ='', phoneNumber='' } = req.body;

    try {

      // Check if the user already exists
      const user = await User.findOne({ uid });
  
      if (user) {
        // Create a new user if they don't exist
        return res.json({message:'User already exists', foundUser: user, status: 301})
      }
      const newUser = await new User({ uid, email, displayName, phoneNumber, photoURL }).save();
      return res.json({ message: "User created successfully", newUser, status : 201});
      
    } catch (err) {
      console.error("Error creating/updating user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };