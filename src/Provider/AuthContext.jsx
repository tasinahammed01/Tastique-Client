import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.init";
import Loading from "../SharedComponents/Loading/Loading";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from backend
  const fetchUserDetails = async (firebaseUser) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${firebaseUser.email}`
      );
      if (response.ok) {
        const users = await response.json();
        const userData = users.find((u) => u.email === firebaseUser.email);
        if (userData) {
          const formattedUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData.role,
            name: userData.name,
            totalDonated: userData.totalDonated,
          };
          setUser(formattedUser);
          localStorage.setItem("user", JSON.stringify(formattedUser));
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In
  const signInUser = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential;
  };

  // Sign Out
  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  // Firebase auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserDetails(firebaseUser);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
