import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);

    } catch (error) {
      console.error("Reset password error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo || null,
    });
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const fetchJWT = async () => {
        if (currentUser?.email) {
          setUser(currentUser);
          await axios.post("http://localhost:5000/jwt", { email: currentUser?.email }, { withCredentials: true });
        } else {
          setUser(null);
          await axios.get("http://localhost:5000/logout", { withCredentials: true });
        }
        setLoading(false);
      };
      fetchJWT();
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};



export default AuthProviders;