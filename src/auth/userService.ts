import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { User } from 'firebase/auth';
import { db } from '../firebase/config';


export const userService = {
    async createUserIfNotExists(user: User) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            //create new user document
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                // createdAt: new Date().toISOString(),
            });
        }
    }
};