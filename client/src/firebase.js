import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCAT9MsiDW1hEneGdpYjTnpHTDxk9I4pYc",
  authDomain: "netflix-clone-80ac4.firebaseapp.com",
  projectId: "netflix-clone-80ac4",
  storageBucket: "netflix-clone-80ac4.appspot.com",
  messagingSenderId: "1006738363744",
  appId: "1:1006738363744:web:ab9a8219d0de8a0e75fa05",
  measurementId: "G-6LRMBB9J8R",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
