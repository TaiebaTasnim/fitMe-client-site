/* eslint-disable react/prop-types */
import  { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/Firebase.config';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)
      const createUser = (email, password) => {
            return createUserWithEmailAndPassword(auth, email, password);
      }
      const signUser = (email, password) => {

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

      const profileUpdate = (updatedData) => {
            //setLoading(true)
            return updateProfile(auth.currentUser, updatedData)
      }

      const authinfo = {
            createUser,
             signUser,
             user,
             signout,
            profileUpdate,
            loading,
            setUser,


      }
      return (
            <AuthContext.Provider value={authinfo}>
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthProvider;