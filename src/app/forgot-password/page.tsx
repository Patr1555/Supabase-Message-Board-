'use client'

import { useState } from "react"
import { resetPasswordRequest } from "../action"
import Link from "next/link"


export default function ForgotPassword(){
const[isSent, setIsSent]=useState(false);


async function handleSubmit(formData:FormData){
    try{
        await resetPasswordRequest(formData);
        setIsSent(true);

    }catch(e){
     alert(e instanceof Error ? e.message : "Request failed");
    }
    
}





return (
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-8">
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-foreground/5 text-center">
                
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight">Reset Password</h1>
                    <p className="text-foreground/50 mt-3 font-medium italic">We'll send a recovery link</p>
                </div>

                {!isSent ? (
                    <form action={handleSubmit} className="space-y-8">
                        <div className="flex flex-col gap-3 text-left">
                            <label className="text-sm font-black ml-3 text-foreground/70 uppercase tracking-widest">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="your@email.com"
                                className="input-bubble h-16 w-full text-lg px-8 outline-none" 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn-soft bg-primary text-white w-full py-5 text-lg font-black uppercase tracking-[0.2em]">
                            Send Link
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-primary font-bold">📧 Recovery link sent!</p>
                        <p className="text-sm text-foreground/50">Check your inbox and spam folder.</p>
                    </div>
                )}

                <div className="mt-12 pt-8 border-t border-foreground/5">
                    <Link href="/login" className="text-primary font-black uppercase tracking-widest text-xs hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    )}
