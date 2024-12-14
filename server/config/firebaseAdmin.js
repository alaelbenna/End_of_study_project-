import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); // Load environment variables

// Get the path to the service account key from environment variables
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error('Firebase service account path is not defined in the environment variables.');
  process.exit(1); // Exit the app if no path is found
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(path.resolve(serviceAccountPath)),
  databaseURL: "https://<your-database-name>.firebaseio.com" // Replace with your actual Firebase Realtime Database URL if applicable
});

export default admin;
