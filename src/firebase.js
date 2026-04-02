import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCisl-OIQqNeo-6juhzVhZQvHLyXokX1EM",
  authDomain: "pencil-classes.firebaseapp.com",
  projectId: "pencil-classes",
  storageBucket: "pencil-classes.firebasestorage.app",
  messagingSenderId: "1091006814004",
  appId: "1:1091006814004:web:afafa3a81187b2ccb2f761",
  measurementId: "G-6ESG8H6KK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

/* DATABASE HELPERS */

export const saveToFirebase = async (collectionName, docId, data) => {
  try {
    await setDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error("Error saving data to Firebase:", error);
    return false;
  }
};

export const getFromFirebase = async (collectionName, docId) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting data from Firebase:", error);
    return null;
  }
};
