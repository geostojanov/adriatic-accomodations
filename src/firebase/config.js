import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBZlS41br7vgFp_4n_gJd_kClIjLXxmHU",
  authDomain: "addriaticaccomodations.firebaseapp.com",
  projectId: "addriaticaccomodations",
  storageBucket: "addriaticaccomodations.firebasestorage.app",
  messagingSenderId: "225089630311",
  appId: "1:225089630311:web:4cb760eae4139f04b0a4c2"
};

// init firebase
firebase.initializeApp(firebaseConfig);
