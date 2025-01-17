/* eslint-disable react/prop-types */
import  { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/Firebase.config';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(false)
      const googleProvider = new GoogleAuthProvider()
      const createUser = (email, password) => {
            return createUserWithEmailAndPassword(auth, email, password);
      }
      const signIn = (email, password) => {

            setLoading(true)
            return signInWithEmailAndPassword(auth, email, password);

      }

      useEffect(() => {
            const unSubscribe = onAuthStateChanged(auth, currentUser => {
                  if (currentUser) {

                        setUser(currentUser)
                        setLoading(false)
                        
                  }
                  else
                  {
                        setLoading(false)
                  }

            })
            return () => {
                  unSubscribe()
            }
      }, [])
      const signout = () => {

            setUser(null)
            setLoading(false)
            return signOut(auth)

      }
      const signInWithGoogle = () => {
            setLoading(true)
            return signInWithPopup(auth, googleProvider)
          }

      const updateUserProfile = (name, photo) => {
            return updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: photo,
            })
          }

      const authinfo = {
            createUser,
             signIn,
             user,
             signout,
           updateUserProfile,
            loading,
            setUser,
            signInWithGoogle


      }
      return (
            <AuthContext.Provider value={authinfo}>
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthProvider;