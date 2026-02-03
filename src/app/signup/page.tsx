'use client'

import { signUp } from "../action"
import Link from "next/link"

export default function CreateUser(){
    return(
        <main className="flex min-h-[85vh] items-center justify-center px-4">
            {/* The Extra-Soft Inquiry Bubble Container */}
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-10 md:p-14 shadow-xl">
                
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
                    <p className="text-foreground/50 mt-3 italic">Join the Minimessage community</p>
                </div>

                <form action={signUp} className="space-y-10">
                    
                    {/* Email Section */}
                    <div className="flex flex-col gap-4">
                        <label className="text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="yourname@example.com"
                            className="input-bubble h-16 text-lg px-8" 
                            required 
                        />
                    </div>

                    {/* Password Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end ml-3">
                            <label className="text-lg font-bold text-foreground/80 tracking-tight">
                                Create Password
                            </label>
                            <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold mb-1">
                                Secure & Strong
                            </span>
                        </div>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create password"
                            className="input-bubble h-16 text-lg px-8" 
                            required 
                        />
                    </div>

                    {/* The Flashy Firm Blue Button */}
                    <button 
                        type="submit" 
                        className="btn-soft w-full py-5 mt-6 text-xl font-bold shadow-md uppercase tracking-widest"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-10 text-center text-base text-foreground/40 font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline transition-all">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}