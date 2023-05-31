// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA9_6cxNEpJsUCja0jSwPg40oDjAwJFSR4',
  authDomain: 'la-comunidad-del-libro.firebaseapp.com',
  projectId: 'la-comunidad-del-libro',
  storageBucket: 'la-comunidad-del-libro.appspot.com',
  messagingSenderId: '90539862409',
  appId: '1:90539862409:web:b945887c0289d8c9119958',
  measurementId: 'G-F6MMC84G7K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
