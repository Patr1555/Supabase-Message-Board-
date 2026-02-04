'use client'
import { useSearchParams } from "next/navigation"

export default function ResetHandoff() {
    const searchParams = useSearchParams()
    const nextUrl = searchParams.get('next')

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="card-soft p-10 text-center rounded-[2rem] shadow-xl">
                <h1 className="text-2xl font-black mb-6">Confirm Password Reset</h1>
                <p className="mb-8 text-foreground/60">Please click the button below to verify your request.</p>
                <a href={nextUrl ?? '/'} className="btn-soft bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest">
                    Continue to Reset
                </a>
            </div>
        </main>
    )
}
