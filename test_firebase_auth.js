const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const fs = require('fs');

const envContent = fs.readFileSync('./.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim().replace(/^"|"$|^'|'$/g, '');
});

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Firebase config loaded with API Key:", firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 10) + "..." : "MISSING");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testAuth() {
  const email = "deva@gmail.com";
  const password = "Deva@123";

  console.log(`\nTesting login for ${email}...`);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("SUCCESS! Logged in as:", userCredential.user.uid);
  } catch (error) {
    console.error("LOGIN FAILED!");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    
    // If login fails because user doesn't exist, try sign up
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-login-credentials') {
      console.log(`\nLogin failed with ${error.code}. Testing Sign Up for ${email}...`);
      try {
        const signUpResult = await createUserWithEmailAndPassword(auth, email, password);
        console.log("SUCCESS! Signed up as:", signUpResult.user.uid);
      } catch (signUpError) {
        console.error("SIGN UP FAILED!");
        console.error("Error Code:", signUpError.code);
        console.error("Error Message:", signUpError.message);
      }
    }
  }
  process.exit();
}

testAuth();
