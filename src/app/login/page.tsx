'use client'

import { useActionState } from "react"
import { signIn } from "../action"
import Link from "next/link"

export default function Login() {
    return (
        <main className="flex min-h-[85vh] items-center justify-center px-4">
            {/* The Large Inquiry Bubble Container */}
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-10 md:p-14 shadow-xl">
                
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
                    <p className="text-foreground/50 mt-3">Log in to your Minimessage account</p>
                </div>

                <form action={signIn} className="space-y-8">
                    {/* Email Input Section - Added more gap */}
                    <div className="flex flex-col gap-4">
                        <label className="text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            className="input-bubble h-16 text-lg" // Increased height & text size
                            required
                        />
                    </div>

                    {/* Password Input Section - Added more gap */}
                    <div className="flex flex-col gap-4">
                        <label className="text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            className="input-bubble h-16 text-lg" // Increased height & text size
                            required
                        />
                    </div>

                    {/* The Flashy Firm Blue Button */}
                    <button 
                        type="submit" 
                        className="btn-soft w-full py-5 mt-6 text-xl font-bold shadow-md uppercase tracking-widest"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-10 text-center text-base text-foreground/40">
                    Need an account?{" "}
                    <Link href="/signup" className="text-primary font-bold hover:underline transition-all">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    )
}
