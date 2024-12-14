// routes/testFirebaseRoute.js

import express from 'express';
import admin from '../config/firebaseAdmin.js';  // Adjust import if needed
const router = express.Router();

// Test Firebase connection
router.get('/test-firebase', async (req, res) => {
  try {
    const firestore = admin.firestore(); // Access Firestore

    // Test writing to Firestore
    const docRef = firestore.collection('testCollection').doc('testDoc');
    await docRef.set({
      testField: 'Hello Firebase',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Read back from Firestore
    const docSnapshot = await docRef.get();
    const data = docSnapshot.data();

    res.status(200).json({
      message: 'Firebase is working!',
      data: data, // Confirm Firestore operation worked
    });
  } catch (error) {
    console.error('Error with Firebase:', error);
    res.status(500).json({
      message: 'Error with Firebase connection.',
      error: error.message,
    });
  }
});

export default router;
