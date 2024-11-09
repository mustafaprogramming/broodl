'use client'
import {Fugaz_One} from "next/font/google";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const fugaz= Fugaz_One({ subsets: ["latin"], weight: ['400'] })


export default function Login() {
  const {signup,login}=useAuth()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('');
  const [isResister,setIsRegister]=useState(false);
  const [authenticating,setAuthenticating]=useState(false);
  const [error,setError]=useState('');
  useEffect(()=>{
    const id=setTimeout(()=>{setError('')},2500)
    return ()=>clearTimeout(id)
  },[error])
  async function handelSubmit(){
    if(!email){
      setError('Please Enter email');
      return
    }
    if(!password){
      setError('Please Enter password');
      return
    }
    if(password.length<6){
      setError('password should be more than 6 characters');
      return
    }
    setAuthenticating(true)
    try{
      if(isResister){
        await signup(email,password)
      }else{
        await login(email,password)
      }
    }catch(err){
      setError(err.message)
    }finally{
      setAuthenticating(false)
    }
  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}>{isResister ? 'Register' : 'Log In'}</h3>
      <p>You&#39;re one step away!</p>
      <p className="text-red-500 text-sm capitalize">{error}</p>
      <input value={email} onChange={(event)=>setEmail(event.target.value)} type="text" className="w-full max-w-[400px] mx-auto duration-200 hover:border-indigo-600 focus:border-indigo-600 px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none" placeholder="Email"/>
      <input value={password} onChange={(event)=>setPassword(event.target.value)} type="text" className="w-full max-w-[400px] mx-auto duration-200 hover:border-indigo-600 focus:border-indigo-600 px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none" placeholder="Password"/>
      <div className="max-w-[400px] w-full mx-auto">
        <Button clickHandler={handelSubmit} text={authenticating?"Submitting":"Submit"} full/>
      </div>
      <p className="text-center">{isResister?'Already':"Don't"} have an account? <button onClick={()=>setIsRegister(!isResister)} className="text-indigo-500">{isResister?'Sign in':'Sign up'}</button></p>
    </div>
  )
}
