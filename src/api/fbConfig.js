import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5uM28dRBGxdh5uZPFibJQ4W91ByZtZ1w",
  authDomain: "mush101-b9a73.firebaseapp.com",
  projectId: "mush101-b9a73",
  storageBucket: "mush101-b9a73.appspot.com",
  messagingSenderId: "62429510285",
  appId: "1:62429510285:web:0cb21f5ed75395396700c4",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBW-BNpXjmEV06gbT0A_1_3ZN7T-oKkMvQ",
//   authDomain: "potato-ee426.firebaseapp.com",
//   databaseURL:
//     "https://potato-ee426-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "potato-ee426",
//   storageBucket: "potato-ee426.appspot.com",
//   messagingSenderId: "465571255779",
//   appId: "1:465571255779:web:462fcb0ae3ff40a6a53cd6",
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
