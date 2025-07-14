import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyD9WvlynCiKQbnTor4-ah8dA_x_ea8_L14",
  authDomain: "otp-project-41de9.firebaseapp.com",
  projectId: "otp-project-41de9",
  storageBucket: "otp-project-41de9.firebasestorage.app",
  messagingSenderId: "412470723319",
  appId: "1:412470723319:web:4303b6fab612bd3f3409f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }