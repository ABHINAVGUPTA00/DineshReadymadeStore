import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Securely initialize Firebase Admin SDK using Environment Variables
// We decode the private key because sometimes environment variables escape newlines incorrectly
const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    })
  });
  console.log('Firebase Admin initialized successfully.');
} else {
  console.warn('Firebase Admin SDK missing credentials. Please configure .env file.');
}

export const db = admin.apps.length ? admin.firestore() : null;
export const auth = admin.apps.length ? admin.auth() : null;
