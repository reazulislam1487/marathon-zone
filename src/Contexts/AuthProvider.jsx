import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../FireBase/Firebase.init";
// import axios from "axios";
const googleAuthprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (userInfos) => {
    console.log(userInfos);
    setLoading(true);
    return updateProfile(auth.currentUser, userInfos);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthprovider);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      // if (user?.email) {
      //   const userData = { email: user.email };
      //   axios
      //     .post(`http://localhost:3000/jwt`, userData, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    createUser,
    signInUser,
    updateUser,
    signInWithGoogle,
    signOutUser,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
