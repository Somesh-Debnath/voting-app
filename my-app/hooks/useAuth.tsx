import React from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,

} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../utils/Firebase'
import { async } from '@firebase/util'

interface  AuthProviderProps{
  children:React.ReactNode
}

interface IAuth{
  user:User | null
  signUp: (email:string, password:string)=>Promise<void>
  signIn: (email:string, password:string)=>Promise<void>
  logout: ()=>Promise<void>
  error: string|null
  loading: boolean
}
const AuthContext=createContext<IAuth>({
    user:null,
    signUp: async ()=>{},
    signIn: async ()=>{},
    logout: async ()=>{},
    error:null,
    loading: false

})
export const AuthProvider=({children}:AuthProviderProps)=> {
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [user,setUser]=useState<User | null>(null)
  const [initialLoading,setInitialLoading]=useState(true)
  const router=useRouter()
  
  useEffect(()=>
    onAuthStateChanged(auth,(user)=>{
      if(user)//Logged in...
      {
        setUser(user)
        setLoading(false)
      }
      else{
        //not logged in
        setUser(null)
        setLoading(true)
        router.push("/")
      }
      setInitialLoading(false)
    }),
    [auth]
  )
  const signUp=async (email:string,password:string)=>{
    setLoading(true)

    await createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      setUser(userCredential.user)
      router.push('/dashboard')
      setLoading(false)
    }).catch((error)=>alert(error.message))
    .finally(()=>setLoading(false))
  }

  const signIn=async (email:string,password:string)=>{
    setLoading(true)

    await signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      setUser(userCredential.user)
      router.push('/dashboard')
      setLoading(false)
    }).catch((error)=>alert(error.message))
    .finally(()=>setLoading(false))
  }

  const logout=async()=>{
    setLoading(true)
    signOut(auth)
    .then(()=>{
      setUser(null)
    })
    .catch((error)=>alert(error.message))
    .finally(()=>setLoading(false))

  }

  const memoedValue=useMemo(()=>({
    user,signUp,signIn,loading,logout,error
  }),[user,loading])
 return <AuthContext.Provider value={memoedValue}>
   {!initialLoading && children}
 </AuthContext.Provider>
}

export default function useAuth(){
  return useContext(AuthContext)
}