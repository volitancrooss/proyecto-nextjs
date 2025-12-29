import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, sendPasswordResetEmail, User, UserCredential } from "firebase/auth";
import { auth } from "./firebase";


export const signInWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        throw new Error(getAuthErrorMessage(error.code));
    }
};


export const signUpWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        throw new Error(getAuthErrorMessage(error.code));
    }
};


export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        throw new Error(getAuthErrorMessage(error.code));
    }
};


export const signOut = async (): Promise<void> => {
    try {
        await firebaseSignOut(auth);
    } catch (error: any) {
        throw new Error("Error al cerrar sesión");
    }
};


export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};


function getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case "auth/invalid-email":
            return "El correo electrónico no es válido";
        case "auth/user-disabled":
            return "Esta cuenta ha sido deshabilitada";
        case "auth/user-not-found":
            return "No se encontró una cuenta con este correo electrónico";
        case "auth/wrong-password":
            return "Contraseña incorrecta";
        case "auth/email-already-in-use":
            return "Ya existe una cuenta con este correo electrónico";
        case "auth/weak-password":
            return "La contraseña debe tener al menos 6 caracteres";
        case "auth/too-many-requests":
            return "Demasiados intentos. Por favor, intenta más tarde";
        case "auth/network-request-failed":
            return "Error de conexión. Verifica tu internet";
        case "auth/invalid-credential":
            return "Credenciales inválidas. Verifica tu correo y contraseña";
        default:
            return "Error al iniciar sesión. Por favor, intenta nuevamente";
    }
}
