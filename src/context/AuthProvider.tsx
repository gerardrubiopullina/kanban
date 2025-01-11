import { ReactNode, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { auth } from '../firebase/config';
import { AuthContext } from './AuthContext';
import { userService } from '../auth/userService';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    await userService.createUserIfNotExists(user);
                } catch (error) {
                    console.error('Error creating user document:', error);
                }
            }
            setUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};