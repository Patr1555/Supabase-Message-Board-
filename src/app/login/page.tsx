'use client'

import { useActionState } from "react"
import { signIn } from "../action"
import Link from "next/link"

export default function Login() {
    return (
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-6">
            {/* Added md:p-14 to keep your desktop padding, but p-8 for mobile so it fits small screens */}
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-foreground/5">
                
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
                    <p className="text-foreground/50 mt-3 font-medium">Log in to your Minimessage account</p>
                </div>

                <form action={signIn} className="space-y-8">
                    {/* Email Input Section */}
                    <div className="flex flex-col gap-4">
                        <label className="text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            /* added px-8 so text doesn't hit the edges on small screens */
                            className="input-bubble h-16 text-lg w-full px-8 outline-none" 
                            required
                        />
                    </div>

                    {/* Password Input Section */}
                    <div className="flex flex-col gap-4">
                        <label className="text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            className="input-bubble h-16 text-lg w-full px-8 outline-none" 
                            required
                        />
                    </div>

 <div className="text-right px-3">
        <Link 
            href="/forgot-password" 
            className="text-[10px] font-black uppercase tracking-widest text-foreground/30 hover:text-primary transition-colors"
        >
            Forgot Password?
        </Link>
    </div>







                    {/* The Flashy Firm Blue Button */}
                    <button 
                        type="submit" 
                        /* Added transition and active:scale for better button feedback */
                        className="btn-soft w-full py-5 mt-6 text-xl font-bold shadow-md uppercase tracking-widest active:scale-95 transition-all"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Link - Increased spacing and font weight for accessibility */}
                <div className="mt-12 pt-6 border-t border-foreground/5 text-center">
                    <p className="text-base text-foreground/40 font-bold">
                        Need an account?{" "}
                        <Link href="/signup" className="text-primary font-black hover:underline transition-all block sm:inline mt-2 sm:mt-0">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}