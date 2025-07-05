// lib/firebaseAdmin.ts
// import { getAuth } from 'firebase-admin/auth';
// import { getApps, initializeApp, cert } from 'firebase-admin/app';

// const firebaseAdminConfig = {
//   credential: cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   }),
// };

// const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

// const adminAuth = getAuth(app);

// export { adminAuth };

import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Import the service account JSON (you can use path aliases or relative path)
import serviceAccount from "./serviceAccountKey.json"; // Adjust the path

// Type assertion to ensure serviceAccount matches the expected structure
const firebaseApp = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: "https://medmin-5c377-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const adminAuth = getAuth(firebaseApp);

export { adminAuth };
