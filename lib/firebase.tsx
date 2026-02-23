import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-udPUqIU7uplWv9eWSPK22B9Wi6TE7gk",
  authDomain: "moda-store-e76c7.firebaseapp.com",
  projectId: "moda-store-e76c7",
  storageBucket: "moda-store-e76c7.firebasestorage.app",
  messagingSenderId: "493903692377",
  appId: "1:493903692377:web:6c6109bb38a2af1f2a6748",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);