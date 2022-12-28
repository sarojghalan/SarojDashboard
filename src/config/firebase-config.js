// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Bcbu_P6Ho1DN5L1AdtVgsW3LTnJpQ2c",
  authDomain: "sarojdashboard.firebaseapp.com",
  projectId: "sarojdashboard",
  storageBucket: "sarojdashboard.appspot.com",
  messagingSenderId: "854482045019",
  appId: "1:854482045019:web:f01332b9b2468a8235577e",
  measurementId: "G-6LSQRGZT35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseDb = getFirestore(app);

export default firebaseDb;
