import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOhO8rVk6U8FBO00hXiOBz_tCG86FSvuA",
  authDomain: "arabic-nuts.firebaseapp.com",
  projectId: "arabic-nuts",
  storageBucket: "arabic-nuts.firebasestorage.app",
  messagingSenderId: "464429511425",
  appId: "1:464429511425:web:1f365dda6f85a60fbba100",
  measurementId: "G-ZZ384CSXRR"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics (only if supported and on client-side)
const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, analytics };
