import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiixXtMJndJG_Vet4Lece6bT3eUvxW0jA",
  authDomain: "challenge-df249.firebaseapp.com",
  projectId: "challenge-df249",
  storageBucket: "challenge-df249.appspot.com",
  messagingSenderId: "740751327210",
  appId: "1:740751327210:web:e4d6b0340b75d6fa5bbc93",
};

const firebaseApp = initializeApp(firebaseConfig);
// export const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default auth;

export const provider = new GoogleAuthProvider();
