import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
apiKey: "AIzaSyAjgJDGP2HTLMAnT9RZGUsuKTulSPhn4GI",
authDomain: "local-food-lovers-network.firebaseapp.com",
projectId: "local-food-lovers-network",
storageBucket: "local-food-lovers-network.firebasestorage.app",
messagingSenderId: "431410589933",
appId: "1:431410589933:web:67f98fc1d17a3ec3c01ce4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();