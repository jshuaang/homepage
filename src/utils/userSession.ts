import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";

export const login = ({ success }: any): void => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            const token: any = credential?.accessToken;
            const name: any = user?.displayName
            if (user && token) {
                localStorage.setItem('token', token);
                localStorage.setItem('name', name)
                success()
            }
        }).catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
        });
}

export const logout = (): void => {
    signOut(auth).then((result) => {
        localStorage.clear()
        return result
    }).catch((error) => {
        // An error happened.
    });
}