import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBr7TQ2JJIoxsFHQPf4CToQ8JDtg_BUR84",
  authDomain: "imessage-clone-c56f5.firebaseapp.com",
  projectId: "imessage-clone-c56f5",
  storageBucket: "imessage-clone-c56f5.appspot.com",
  messagingSenderId: "881416902380",
  appId: "1:881416902380:web:470f7d24ea539c510537c9",
  measurementId: "G-D6HZMTTL96",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
