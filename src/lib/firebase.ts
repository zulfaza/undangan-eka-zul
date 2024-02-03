// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATT_m7qoscsbR7BPNvrFBnlse_vh_jgFI',
  authDomain: 'undangan-eka-zul.firebaseapp.com',
  projectId: 'undangan-eka-zul',
  storageBucket: 'undangan-eka-zul.appspot.com',
  messagingSenderId: '529370478520',
  appId: '1:529370478520:web:cbbfdd151b6c69b5b9014d',
  measurementId: 'G-2HJRQHVT1F',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
