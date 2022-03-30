import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB3c5Ufo-PHvMSrjRw7k7oHMPHFcAtWomc",
  authDomain: "fir-9-507fd.firebaseapp.com",
  projectId: "fir-9-507fd",
  storageBucket: "fir-9-507fd.appspot.com",
  messagingSenderId: "201710934034",
  appId: "1:201710934034:web:42a1c20cba06dfae5720cb",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, provider, db, storage };
