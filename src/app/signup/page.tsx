'use client'

import { useState } from "react"
import { resendEmail, signUp } from "../action"
import Link from "next/link"

export default function CreateUser(){
    const[isSent, setIsSent]=useState(false);
    const[userEmail, setUserEmail]=useState("");
    const [resendStatus, setResendStatus]=useState<"Idle"|"Sending"|"Sent">("Idle");

    async function handleSubmits(formData:FormData){
        try{
            const result= await signUp(formData);
            if(result?.success){
                setUserEmail(result.email);
                setIsSent(true);
            }
        }catch(e){
            alert(e instanceof Error ? e.message : "Signup failed")
         }
    }

    async function onResendClick(formData:FormData){
        setResendStatus("Sending");
        try{
            await resendEmail(formData);
            setResendStatus("Sent");
             // Switch back to "idle" after 30 seconds so they can try again
             setTimeout(()=>setResendStatus("Idle"),30000);
        }catch(e){
            setResendStatus("Idle");
            alert("Please wait a moment before resending.")
        }
    }

if (isSent) {
    return (
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-6">
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-8 md:p-14 shadow-xl text-center border border-foreground/5">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Check your inbox! 📧</h1>
                    <p className="text-foreground/50 mt-4 italic">We've sent a magic link to</p>
                    <p className="text-primary font-bold text-lg break-all px-2">{userEmail}</p>
                </div>

               <div className="mt-8 h-14 flex flex-col items-center justify-center border-t border-foreground/5 pt-6"> 
                        {resendStatus === "Sent" ? (
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 animate-bounce">
                                ✅ New Link Sent!
                            </p>
                        ) : (
                        <form action={onResendClick} className="w-full">
                                <input type="hidden" name="email" value={userEmail} />
                                <button 
                                    type="submit" 
                                    disabled={resendStatus === "Sending"}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline disabled:opacity-30 transition-all w-full"
                                >
                                    {resendStatus === "Sending" ? "Sending..." : "Resend Verification Link"}
                                </button>
                            </form>)}
                </div>

                <div className="space-y-4 mt-6">
                    <p className="text-sm text-foreground/40 leading-relaxed">
                        Please click the link in the email to verify your account. <br className="hidden md:block" />
                        If you don't see it, check your <strong>Spam folder</strong>.
                    </p>
                </div>

                <div className="mt-10 pt-8 border-t border-foreground/5">
                    <Link href="/login" className="text-primary font-black uppercase tracking-widest text-xs hover:underline transition-all block w-full py-2">
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    )
}

    return(
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-6">
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-foreground/5">
                
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
                    <p className="text-foreground/50 mt-3 italic font-medium">Join the Minimessage community</p>
                </div>

                <form action={handleSubmits} className="space-y-8">
                    <div className="flex flex-col gap-3">
                        <label className="text-base md:text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="yourname@example.com"
                            className="input-bubble h-16 w-full text-lg px-8 outline-none" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end ml-3">
                            <label className="text-base md:text-lg font-bold text-foreground/80 tracking-tight">
                                Create Password
                            </label>
                            <span className="text-[9px] uppercase tracking-widest text-foreground/30 font-bold mb-1 hidden sm:block">
                                Secure & Strong
                            </span>
                        </div>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create password"
                            className="input-bubble h-16 w-full text-lg px-8 outline-none" 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-soft w-full py-5 mt-4 text-xl font-bold shadow-md uppercase tracking-widest active:scale-95 transition-all"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-foreground/5 text-center">
                    <p className="text-sm md:text-base text-foreground/40 font-bold mb-4">
                        Already have an account?
                    </p>
                    <Link 
                        href="/login" 
                        className="inline-block w-full py-4 rounded-full border-2 border-primary/20 text-primary font-black uppercase tracking-[0.2em] hover:bg-primary/5 transition-all text-xs"
                    >
                        Login to account
                    </Link>
                </div>
            </div>
        </main>
    )
}
