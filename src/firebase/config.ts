import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyDwbM-1_jg4D6KtWe9difOdp7lE5319XGw",
    authDomain: "kanban-board-bc2fe.firebaseapp.com",
    projectId: "kanban-board-bc2fe",
    storageBucket: "kanban-board-bc2fe.firebasestorage.app",
    messagingSenderId: "37153513897",
    appId: "1:37153513897:web:8adf98fb93d1a19e6ca4b8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);