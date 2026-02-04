'use client'
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { signIn } from "../action"
import Link from "next/link"
import { Suspense } from "react"

// Logic and UI remain untouched, just moved into this sub-component
function LoginContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    return (
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-6">
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-foreground/5">
                {message && (
                    <div className="mb-8 p-5 rounded-3xl bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-4">
                        ✅ {message}
                    </div>
                )}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
                    <p className="text-foreground/50 mt-3 font-medium">Log in to your Minimessage account</p>
                </div>

                <form action={signIn} className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <label className="text-lg font-bold ml-3 text-foreground/80 tracking-tight">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            className="input-bubble h-16 text-lg w-full px-8 outline-none" 
                            required
                        />
                    </div>

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

                    <button 
                        type="submit" 
                        className="btn-soft w-full py-5 mt-6 text-xl font-bold shadow-md uppercase tracking-widest active:scale-95 transition-all"
                    >
                        Sign In
                    </button>
                </form>

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

// This is the main export that Vercel needs to see the Suspense boundary
export default function Login() {
    return (
        <Suspense fallback={null}>
            <LoginContent />
        </Suspense>
    )
}
