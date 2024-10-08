import {  signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GithubAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase";
// import axios from 'axios';
import { PropTypes } from 'prop-types';
import axios from "axios";


export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const[loading, setLoading]=useState(true)

    const providerGoogle = new GoogleAuthProvider();
    const creatUserGoogle =()=>{
        setLoading(true)
       return signInWithPopup(auth,providerGoogle)
    
    }
    const providerGithub = new GithubAuthProvider();
    const creatUserGithub =()=>{
        setLoading(true)
       return signInWithPopup(auth,providerGithub)
    }
    const creatUserPassword = ( email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

   const signInWithPassword =( email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
    
   }
    
  
    const LogOutUser = ()=>{

        //setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setLoading(false)
            setUser(currentUser);
            const userInfo = { email: currentUser?.email||user?.email||user?.displayName };
            
            if (currentUser) {
                axios.post('https://server-study.vercel.app/jwt', userInfo, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    if (res.data.token) {
                        //console.log(res);
                        localStorage.setItem('accessToken', res.data.token);
                    }
                })
                .catch(err => {
                    console.error('Error during axios request:', err);
                });
            } else {
                localStorage.removeItem('accessToken');
            }
           
        })
        return ()=> unsubscribe()
    },[user?.email,user?.displayName]);
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          
        })
      }

    const GetAllData ={
        creatUserGithub,creatUserGoogle,user,LogOutUser,creatUserPassword,signInWithPassword,loading,setLoading,updateUserProfile,setUser
    }
    return (
        <AuthContext.Provider value={GetAllData}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes={
    children:PropTypes.element
}

export default AuthProvider;