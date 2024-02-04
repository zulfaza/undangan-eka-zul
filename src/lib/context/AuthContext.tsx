'use client';

import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const initialState = {
    user: null,
    isLoading: true,
}

type AuthContextStateType = {
    user: User | null,
    isLoading: boolean,
    error?: string,
}

type AuthContextActionType = {
    login: () => Promise<void>;
    logout: () => Promise<void>
}

export const AuthContext = createContext<{
    state: AuthContextStateType;
    actions: AuthContextActionType;
}>({
    state: initialState,
    actions: {} as AuthContextActionType,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [User, setUser] = useState<AuthContextStateType['user']>(null);
    const [IsLoading, setIsLoading] = useState(true);

    const login = async () => {
        // auth.languageCode = 'id';
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        const loginResult = await signInWithPopup(auth, provider)
            .catch((error) => {
                console.log(error);
                return null;
            });
        if (!loginResult) {
            return;
        }

        const loggedInUser = loginResult.user;
        onAuthStateChanged(auth, (User) => {
            if (User) {
                setUser(User);
            } else {
                setUser(null);
            }
        });
        console.log("User : ", loggedInUser);
        const prevData = await getDoc(doc(
            db, 'users', loggedInUser.uid));
        if (!prevData.exists()) {
            await setDoc(doc(db, 'users', loggedInUser.uid), {
                email: loggedInUser.email,
                name: loggedInUser.displayName,
                emailVerified: loggedInUser.emailVerified,
                photo_url: loggedInUser.photoURL,
                phone_number: loggedInUser.phoneNumber
            })
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // Use onAuthStateChanged to handle initial authentication state
        const unsubscribe = onAuthStateChanged(auth, (User) => {
            if (User) {
                // User is signed in
                setUser(User);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, [auth]);


    return (
        <AuthContext.Provider value={{
            state: {
                user: User,
                isLoading: IsLoading,
            },
            actions: {
                login,
                logout
            }
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider