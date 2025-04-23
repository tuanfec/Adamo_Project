import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getIdToken,
  onIdTokenChanged,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  ActionCodeSettings,
} from "firebase/auth";
import { auth } from "@config/firebase";

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Store token in memory
let currentToken: string | null = null;

// Listen for token changes
onIdTokenChanged(auth, async (user) => {
  if (user) {
    try {
      const token = await getIdToken(user);
      currentToken = token;
    } catch (error) {
      console.error("Error getting token:", error);
      currentToken = null;
    }
  } else {
    currentToken = null;
  }
});

export const getCurrentToken = async (): Promise<string | null> => {
  try {
    if (currentToken) return currentToken;

    const user = auth.currentUser;
    if (!user) return null;

    const token = await getIdToken(user);
    currentToken = token;
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const token = await getIdToken(user, true);
    currentToken = token;
    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export const registerUser = async (userData: UserData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
    });

    const token = await getIdToken(user);
    currentToken = token;

    const serializableUser: SerializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return {
      success: true,
      user: serializableUser,
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during registration",
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const token = await getIdToken(user);
    currentToken = token;

    const serializableUser: SerializableUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return {
      success: true,
      user: serializableUser,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during login",
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    currentToken = null;
    localStorage.setItem("isLoggedIn", "false");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const loginWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error("No credential found");
    }
    const token = await getIdToken(result.user);
    currentToken = token;
    const serializableUser: SerializableUser = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    };
    return {
      success: true,
      user: serializableUser,
    };
  } catch (error: any) {
    console.error("Login with Facebook error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during login with Facebook",
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const actionCodeSettings: ActionCodeSettings = {
      url: `${window.location.origin}/`,
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return {
      success: true,
      message:
        "Password reset email sent successfully. Please check your email to confirm.",
    };
  } catch (error: any) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: error.message || "Failed to send password reset email",
    };
  }
};
